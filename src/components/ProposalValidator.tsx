import { useMemo, useState } from 'react'

import { cn } from '../lib/utils'

type Finding = {
  level: 'error' | 'warning'
  message: string
  line?: number
}

type Heading = {
  level: number
  text: string
  line: number
}

const EXPECTED_SECTIONS = ['Abstract', 'Motivation', 'Specification']

// Matches self-assigned EP numbers like "[7.1]", "[EP 7.1]" or "EP 7.1"
const EP_NUMBER_PATTERN = /\[\s*(ep\s*)?\d+(\.\d+)*\s*\]|\bep\s*\d+(\.\d+)+/i

// Matches type tags like "[Executable]" or "[Social]"
const TYPE_TAG_PATTERN =
  /\[\s*(executable|social|constitutional amendment)\s*\]/i

const TEMP_CHECK_PATTERN = /\[\s*temp\s*check\s*\]/i

function parseHeadings(markdown: string): Heading[] {
  const headings: Heading[] = []
  const lines = markdown.split('\n')
  let codeFence: string | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Skip headings inside fenced code blocks
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/)
    if (fenceMatch) {
      if (!codeFence) codeFence = fenceMatch[1][0]
      else if (fenceMatch[1][0] === codeFence) codeFence = null
      continue
    }
    if (codeFence) continue

    const headingMatch = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/)
    if (headingMatch) {
      headings.push({
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
        line: i + 1,
      })
    }
  }

  return headings
}

// Pasting from some tools produces literal "\n" sequences instead of real
// newlines, which makes the whole document parse as a single line. Convert
// them (and literal tabs) to the real characters so the text can be parsed.
export function beautify(markdown: string): string {
  const literalNewlines = (markdown.match(/\\n/g) || []).length
  const realNewlines = (markdown.match(/\n/g) || []).length
  if (literalNewlines > 2 && literalNewlines > realNewlines) {
    return markdown.replace(/\\n/g, '\n').replace(/\\t/g, '\t')
  }
  return markdown
}

export function validate(markdown: string): Finding[] {
  const findings: Finding[] = []
  const headings = parseHeadings(markdown)
  const h1s = headings.filter((h) => h.level === 1)

  // A proposal needs headings, but zero H1s is fine: Snapshot and the forum
  // have a separate title field that acts as the H1, so those bodies should
  // start at H2
  if (headings.length === 0) {
    findings.push({
      level: 'error',
      message:
        'No headings found. The document should have a single H1 (`# Title`) followed by H2 sections — or start directly at H2 if the title is set in a separate field, as on Snapshot and the forum.',
    })
  }

  if (h1s.length > 1) {
    for (const h1 of h1s.slice(1)) {
      findings.push({
        level: 'error',
        message: `Multiple H1 headings. Only the title should be an H1 — change "${h1.text}" to an H2 (\`##\`).`,
        line: h1.line,
      })
    }
  }

  const title = h1s[0]

  if (title) {
    // The H1 should be the first heading in the document
    if (headings[0] !== title) {
      findings.push({
        level: 'error',
        message:
          'The title (H1) should be the first heading in the document, before any sections.',
        line: title.line,
      })
    }

    // No self-assigned EP numbers
    if (EP_NUMBER_PATTERN.test(title.text)) {
      findings.push({
        level: 'error',
        message:
          'The title contains an EP number. Remove it — the canonical number is assigned automatically once the proposal is posted for a vote.',
        line: title.line,
      })
    }

    // No type tags
    const typeTag = title.text.match(TYPE_TAG_PATTERN)
    if (typeTag) {
      findings.push({
        level: 'error',
        message: `The title contains a type tag ("${typeTag[0]}"). Remove it — the type is inferred from where the vote is posted.`,
        line: title.line,
      })
    }

    // Temp check prefix is only for forum drafts
    if (TEMP_CHECK_PATTERN.test(title.text)) {
      findings.push({
        level: 'warning',
        message:
          'The title has a [Temp Check] prefix. This is correct for forum drafts, but remove it before posting the proposal to Snapshot or the governor contract.',
        line: title.line,
      })
    }
  }

  // No skipped heading levels (e.g. H2 followed by H4)
  for (let i = 1; i < headings.length; i++) {
    const prev = headings[i - 1]
    const curr = headings[i]
    if (curr.level > prev.level + 1) {
      findings.push({
        level: 'warning',
        message: `Heading level skips from H${prev.level} to H${curr.level} at "${curr.text}". Headings should only go one level deeper at a time.`,
        line: curr.line,
      })
    }
  }

  // Expected sections
  const h2Texts = headings
    .filter((h) => h.level === 2)
    .map((h) => h.text.toLowerCase())

  for (const section of EXPECTED_SECTIONS) {
    if (!h2Texts.includes(section.toLowerCase())) {
      findings.push({
        level: 'warning',
        message: `Missing a "${section}" section. Proposals typically include \`## ${section}\`.`,
      })
    }
  }

  return findings.sort((a, b) => {
    if (a.level !== b.level) return a.level === 'error' ? -1 : 1
    return (a.line ?? Infinity) - (b.line ?? Infinity)
  })
}

export function ProposalValidator() {
  const [markdown, setMarkdown] = useState('')
  const findings = useMemo(() => validate(markdown), [markdown])

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(beautify(e.target.value))}
        placeholder={
          '# Do Something Cool\n\n## Abstract\n\n## Motivation\n\n## Specification'
        }
        rows={10}
        spellCheck={false}
        className="border-border placeholder:text-text-disabled w-full resize-y rounded-md border px-4 py-3 font-mono text-sm transition-all outline-none focus-visible:border-[var(--vocs-color_borderAccent)]"
      />

      {markdown.trim() !== '' &&
        (findings.length === 0 ? (
          <div className="border-green-light bg-green-surface text-green-dim rounded-md border px-4 py-3 text-sm font-medium">
            No issues found
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {findings.map((finding, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-baseline gap-3 rounded-md border px-4 py-3 text-sm',
                  finding.level === 'error'
                    ? 'border-red-light bg-red-surface'
                    : 'border-yellow-light bg-yellow-surface'
                )}
              >
                <span
                  className={cn(
                    'shrink-0 font-semibold uppercase',
                    finding.level === 'error' ? 'text-red' : 'text-yellow-dim'
                  )}
                >
                  {finding.level}
                </span>
                <span>
                  {finding.message}
                  {finding.line !== undefined && (
                    <span className="text-text-secondary">
                      {' '}
                      (line {finding.line})
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}
