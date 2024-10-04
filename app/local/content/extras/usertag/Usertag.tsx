import clsx from 'clsx';
import { FC } from 'react';
import {ABCMonumentGroteskSemiMono} from '../../../../src/fonts/index';

export type UsertagVariant = 'full' | 'small';

export const Usertag: FC<{
    name?: string;
    image?: string;
    variant?: UsertagVariant;
}> = ({ name = 'nick.eth', image = '/nick.eth.png', variant = 'full' }) => {
    return (
        <div className="not-prose">
            <div className={clsx("flex h-fit items-center gap-1 overflow-hidden rounded-md", 'bg-ens-v2-blue-light text-ens-v2-blue-default')}>
                {variant == 'full' && (
                    <div className="aspect-square size-12 overflow-hidden p-1 rounded-md">
                        <img
                            src={image}
                            alt=""
                            className="rounded-md"
                        />
                    </div>
                )}
                <div className={clsx("px-3 pl-0 text-ens-light-blue-primary first-of-type:pl-3 dark:text-ens-dark-blue-primary", ABCMonumentGroteskSemiMono.className)}>
                    {name}
                </div>
            </div>
        </div>
    );
};
