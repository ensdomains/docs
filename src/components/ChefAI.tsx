import AskCookbook from '@cookbookdev/docsbot/react'

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmJlNWY2ZDZkMjk4YjBkZjY5YTRmYjAiLCJpYXQiOjE3MjM3NTIzMDEsImV4cCI6MjAzOTMyODMwMX0.VramSR-VHSbgdQfscWvoahAuYMhLbc8i1_7wW50z_IU'

export default function ChefAI() {
  return (
    <>
      <AskCookbook apiKey={COOKBOOK_PUBLIC_API_KEY} />
    </>
  )
}
