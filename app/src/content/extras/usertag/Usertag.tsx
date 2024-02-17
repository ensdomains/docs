import { FC } from 'react';

export type UsertagVariant = 'full' | 'small';

export const Usertag: FC<{
    name?: string;
    image?: string;
    variant?: UsertagVariant;
}> = ({ name = 'nick.eth', image = '/nick.eth.png', variant = 'full' }) => {
    return (
        <div className="not-prose">
            <div className="flex h-fit items-center gap-1 overflow-hidden !rounded-full border border-ens-light-border dark:border-ens-dark-border">
                {variant == 'full' && (
                    <div className="aspect-square size-12 overflow-hidden rounded-full p-1">
                        <img
                            src={image}
                            alt=""
                            className="rounded-full border border-ens-light-border dark:border-ens-dark-border"
                        />
                    </div>
                )}
                <div className="px-3 pl-0 font-bold text-ens-light-blue-primary first-of-type:pl-3 dark:text-ens-dark-blue-primary">
                    {name}
                </div>
            </div>
        </div>
    );
};
