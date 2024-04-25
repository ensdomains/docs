import { FC } from 'react';

export const VideoGallery: FC<{}> = () => {
    return (
        <div className="not-prose mt-0 grid w-full grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
                {
                    title: 'ETHGlobal London Workshop',
                    location: 'ETHGlobal London',
                    description: '',
                    href: 'https://www.youtube.com/watch?v=SOHsmBwxgFs',
                    cover: 'https://i3.ytimg.com/vi_webp/SOHsmBwxgFs/mqdefault.webp',
                },
                {
                    title: 'ETHDenver ENS Workshop',
                    location: 'ETHDenver',
                    description: '',
                    href: 'https://www.youtube.com/watch?v=hz1KH1qvzB4',
                    cover: '/content/videos/ethdenver24.webp',
                },
                {
                    title: 'February 2024 Docs Update',
                    location: 'Documentation',
                    description: '',
                    href: 'https://www.youtube.com/watch?v=GwX_m28SSOA',
                    cover: 'https://i3.ytimg.com/vi_webp/GwX_m28SSOA/mqdefault.webp',
                },
                {
                    title: 'ETHRome ENS Workshop 1',
                    location: 'ETHRome',
                    description:
                        'Greg, from ENS, gives an introductory workshop around what ENS is, why it is important, how it works, and how to build on top of it.',
                    href: 'https://www.youtube.com/watch?v=HIDPGdTDCj8',
                    cover: 'https://i3.ytimg.com/vi_webp/HIDPGdTDCj8/mqdefault.webp',
                },
                {
                    title: 'ETHRome ENS Workshop 2',
                    location: 'ETHRome',
                    description: 'Luc, from ENS, ',
                    href: 'https://www.youtube.com/watch?v=SHuCDqPbAP4',
                    cover: 'https://i3.ytimg.com/vi_webp/SHuCDqPbAP4/mqdefault.webp',
                },
                {
                    title: 'Cross Chain Interoperability',
                    location: 'ETHPrague',
                    description: '',
                    href: 'https://www.youtube.com/watch?v=URnUs4sSrU4',
                    cover: 'https://i3.ytimg.com/vi_webp/URnUs4sSrU4/mqdefault.webp',
                },
                {
                    title: 'State of ENS by Nick Johnson',
                    location: 'Devcon Bogota',
                    description:
                        // eslint-disable-next-line quotes
                        "An overview of ENS's innovations and progress in the last couple of years",
                    href: 'https://www.youtube.com/watch?v=Pta198KJTaw',
                    cover: 'https://i3.ytimg.com/vi_webp/Pta198KJTaw/mqdefault.webp',
                },
            ].map((entry, index) => (
                <a
                    className="border-ens-light-border dark:border-ens-dark-border bg-ens-light-background-primary dark:bg-ens-dark-background-primary hover:bg-ens-light-background-secondary/50 hover:dark:bg-ens-dark-background-secondary/50 my-0 flex w-full flex-col overflow-hidden rounded-lg border py-0"
                    href={entry.href}
                >
                    <div className="bg-ens-light-background-disabled dark:bg-ens-dark-background-secondary aspect-video w-full">
                        {entry.cover && (
                            <img
                                src={entry.cover}
                                alt=""
                                className="aspect-video w-full"
                            />
                        )}
                    </div>
                    <div className="border-ens-light-border dark:border-ens-dark-border w-full text-ellipsis border-t px-3 pb-3 pt-2">
                        <span className="font-bold">{entry.title}</span>
                        <p className="tag tag-blue">{entry.location}</p>
                        {/*<p className="h-16 overflow-ellipsis text-xs">{entry.description}</p>*/}
                    </div>
                </a>
            ))}
        </div>
    );
};
