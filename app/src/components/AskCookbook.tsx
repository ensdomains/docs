///** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmJlNWY2ZDZkMjk4YjBkZjY5YTRmYjAiLCJpYXQiOjE3MjM3NTIzMDEsImV4cCI6MjAzOTMyODMwMX0.VramSR-VHSbgdQfscWvoahAuYMhLbc8i1_7wW50z_IU';

export default function AskCookbook() {
    return (
        <>
            <div id="__cookbook" data-api-key={COOKBOOK_PUBLIC_API_KEY}></div>
            <script
                src="https://cdn.jsdelivr.net/npm/@cookbookdev/docsbot/dist/standalone/index.cjs.js"
                defer
            ></script>
        </>
    );
}
