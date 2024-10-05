import { FC, PropsWithChildren } from 'react';

export const DemoSection: FC<PropsWithChildren<{ name: string }>> = ({
    name,
    children,
}) => {
    return (
        <div className="card1 flex items-center justify-between gap-3 p-4">
            <div className="not-prose flex flex-col gap-2">
                {/* <span className="text-ens-light-blue-primary dark:text-ens-dark-blue-primary">
                    ETHRegistrarController
                </span> */}
                <span className="text-ens-light-text-secondary dark:text-ens-dark-text-secondary">
                    {name}
                </span>
            </div>
            <div className="not-prose max-w-xl space-y-2">{children}</div>
        </div>
    );
};
