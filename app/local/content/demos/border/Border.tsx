import { FC, PropsWithChildren } from 'react';

import { BorderConnection } from './BorderConnection';

export const DemoBorder: FC<
    PropsWithChildren<{
        showConnect: boolean;
        title: string;
        chains?: Set<number>;
    }>
> = ({ children, showConnect, title, chains }) => {
    return (
        <div className="rounded-2xl bg-ens-light-blue-surface p-2 dark:bg-ens-dark-blue-surface">
            <div className="flex items-center justify-between p-2 pb-4">
                <div className="font-bold">{title}</div>
                <div>{showConnect && <BorderConnection chains={chains} />}</div>
            </div>
            <div className="rounded-xl bg-ens-light-background-primary dark:bg-ens-dark-background-primary">
                {children}
            </div>
        </div>
    );
};
