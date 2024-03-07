import clsx from 'clsx';
import { FC, PropsWithChildren, ReactNode } from 'react';

type AllProperties = {
    call: ReactNode;
    description?: string;
};

type EthCallProperties = {
    type?: 'call';
};

type EthTransactionProperties = {
    type?: 'transaction';
    gas: string;
};

export const EthCall: FC<
    PropsWithChildren<
        AllProperties & (EthCallProperties | EthTransactionProperties)
    >
> = ({ type = 'call', call, children, description }) => {
    const is_transaction = type == 'transaction';

    return (
        <div className="pt-2">
            <div className="space-y-2 rounded-lg border border-ens-light-border p-4 dark:border-ens-dark-border">
                <div className="relative">
                    <div
                        className={clsx(
                            'absolute -top-4 w-fit -translate-y-1/2 bg-ens-light-background-primary px-2 font-bold dark:bg-ens-dark-background-primary',
                            is_transaction
                                ? 'text-ens-light-orange-primary dark:text-ens-dark-orange-primary'
                                : 'text-ens-light-blue-primary dark:text-ens-dark-blue-primary'
                        )}
                    >
                        {is_transaction ? 'Transaction' : 'ETH Call'}
                    </div>
                </div>
                <div className="inline text-ens-light-text-secondary dark:text-ens-dark-text-secondary">
                    {description}
                </div>
                <div className="break-all rounded-lg border border-ens-light-border p-2 dark:border-ens-dark-border">
                    {call}
                </div>
                {children}
            </div>
        </div>
    );
};
