import clsx from 'clsx';
import { FC } from 'react';

type HelperType = 'info' | 'warning' | 'error';

export const Helper: FC<{ children: string; type: HelperType }> = ({
    children,
    type,
}) => {
    const colors = {
        info: 'blue',
        warning: 'yellow',
        error: 'red',
    };

    const color = colors[type] || 'blue';
    const classes = `border-ens-light-${color}-bright bg-ens-light-${color}-surface dark:border-ens-dark-${color}-bright dark:bg-ens-dark-${color}-surface`;

    return (
        <div>
            <div
                className={clsx([classes, 'not-prose  rounded-md border p-6'])}
            >
                <p>{children}</p>
            </div>
        </div>
    );
};
