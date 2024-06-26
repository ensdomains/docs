import { FC, PropsWithChildren } from 'react';

import {
    CodePanel,
    CodePanelProperties,
} from '#/content/prose/code/snippet/CodeSnippet';

import { CodeGroup } from './group/CodeGroup';

export function Code({ children, ...properties }) {
    return (
        <code {...properties} dangerouslySetInnerHTML={{ __html: children }} />
    );
}

export const Pre: FC<PropsWithChildren<CodePanelProperties>> = ({
    children,
    // title,
    isChild,
    ...properties
}) => {
    if (isChild) {
        return <CodePanel {...properties}>{children}</CodePanel>;
    }

    return (
        <CodeGroup {...properties} isChild={true}>
            {children}
        </CodeGroup>
    );
};
