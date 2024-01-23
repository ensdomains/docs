import { FC } from 'react';

export const Usertag: FC<{ name: string; image: string }> = ({
    name = 'nick.eth',
    image = '/nick.eth.png',
}) => {
    return (
        <div className="not-prose">
            <div className="flex h-fit items-center gap-1 overflow-hidden !rounded-full border border-ens-light-border pr-4 shadow-sm dark:border-ens-dark-border">
                <div className="ml-0.5 aspect-square h-12 w-12 overflow-hidden rounded-full p-1">
                    <img
                        src={image}
                        alt=""
                        className="rounded-full border border-ens-light-border dark:border-ens-dark-border"
                    />
                </div>
                <div className="text-base font-bold">{name}</div>
            </div>
        </div>
    );
};
