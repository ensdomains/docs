'use client';

import { Mermaid as MermaidZ } from 'mdx-mermaid/lib/Mermaid';

export const Mermaid = ({ chart }) => {
    return <MermaidZ chart={chart} />;
};
