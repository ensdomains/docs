import clsx from 'clsx';
import { FC } from 'react';

export const Prose: FC<{
    as?: 'article';
    className?: string;
    children?: any;
}> = ({ className, ...properties }) => {
    return (
        <article
            className={clsx(className, 'prose x dark:prose-invert')}
            {...properties}
        />
    );
};
