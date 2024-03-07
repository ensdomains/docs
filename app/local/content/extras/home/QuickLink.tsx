import Link from 'next/link';
import { FC } from 'react';

export const QuickBannerLink: FC<{
    title: string;
    description: string;
    href: string;
    image: string;
}> = ({ title, description, href, image }) => {
    return (
        <Link
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            className="not-prose !m-0 flex flex-col overflow-hidden rounded-lg bg-ens-light-background-secondary !p-0 text-inherit hover:text-inherit hover:no-underline hover:brightness-95 active:ring active:ring-ens-light-blue-primary dark:bg-ens-dark-background-secondary active:dark:ring-ens-dark-blue-primary"
        >
            <div className="aspect-[21/9] w-full">
                {image && <img src={image} alt="" className="h-auto w-full" />}
            </div>
            <div className="flex grow items-center p-6">
                <div className="w-full">
                    <div className="font-bold text-ens-light-blue-primary dark:text-ens-dark-blue-primary">
                        {title}
                    </div>
                    <div className="leading-5">{description}</div>
                </div>
            </div>
        </Link>
    );
};
