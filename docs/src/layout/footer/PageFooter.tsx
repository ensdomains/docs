import Link from 'next/link';
import { FC } from 'react';
import { FaXTwitter } from 'react-icons/fa6';

// import { navigation } from '@/lib/headers';
import { MdxPageProps } from '@/lib/mdxPageProps';

import { ContributeLink } from './contribute/ContributeLink';
import { Feedback } from './feedback/FeedbackSection';

// function PageLink({ label, page, previous = false }) {
//     return (
//         <>
//             <Button
//                 href={page.href}
//                 aria-label={`${label}: ${page.title}`}
//                 variant="secondary"
//                 arrow={previous ? 'left' : 'right'}
//                 className={''}
//             >
//                 {label}
//             </Button>
//             <Link
//                 href={page.href}
//                 tabIndex={-1}
//                 aria-hidden="true"
//                 className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
//             >
//                 {page.title}
//             </Link>
//         </>
//     );
// }

// function PageNavigation() {
//     const pathname = usePathname();
//     const allPages = navigation
//         .find(([path, group]) => pathname.match(path) && group)[1]
//         .flatMap((group) => group.links);
//     const currentPageIndex = allPages
//         .filter((a) => a)
//         .findIndex((page) => page.href === pathname);

//     if (currentPageIndex === -1) {
//         return;
//     }

//     const previousPage = allPages[currentPageIndex - 1];
//     const nextPage = allPages[currentPageIndex + 1];

//     if (!previousPage && !nextPage) {
//         return;
//     }

//     return (
//         <div className="flex">
//             {previousPage && (
//                 <div className="flex flex-col items-start gap-3">
//                     <PageLink label="Previous" page={previousPage} previous />
//                 </div>
//             )}
//             {nextPage && (
//                 <div className="ml-auto flex flex-col items-end gap-3">
//                     <PageLink label="Next" page={nextPage} />
//                 </div>
//             )}
//         </div>
//     );
// }
function GitHubIcon(properties) {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" {...properties}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 1.667c-4.605 0-8.334 3.823-8.334 8.544 0 3.78 2.385 6.974 5.698 8.106.417.075.573-.182.573-.406 0-.203-.011-.875-.011-1.592-2.093.397-2.635-.522-2.802-1.002-.094-.246-.5-1.005-.854-1.207-.291-.16-.708-.556-.01-.567.656-.01 1.124.62 1.281.876.75 1.292 1.948.93 2.427.705.073-.555.291-.93.531-1.143-1.854-.213-3.791-.95-3.791-4.218 0-.929.322-1.698.854-2.296-.083-.214-.375-1.09.083-2.265 0 0 .698-.224 2.292.876a7.576 7.576 0 0 1 2.083-.288c.709 0 1.417.096 2.084.288 1.593-1.11 2.291-.875 2.291-.875.459 1.174.167 2.05.084 2.263.53.599.854 1.357.854 2.297 0 3.278-1.948 4.005-3.802 4.219.302.266.563.78.563 1.58 0 1.143-.011 2.061-.011 2.35 0 .224.156.491.573.405a8.365 8.365 0 0 0 4.11-3.116 8.707 8.707 0 0 0 1.567-4.99c0-4.721-3.73-8.545-8.334-8.545Z"
            />
        </svg>
    );
}

function DiscordIcon(properties) {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" {...properties}>
            <path d="M16.238 4.515a14.842 14.842 0 0 0-3.664-1.136.055.055 0 0 0-.059.027 10.35 10.35 0 0 0-.456.938 13.702 13.702 0 0 0-4.115 0 9.479 9.479 0 0 0-.464-.938.058.058 0 0 0-.058-.027c-1.266.218-2.497.6-3.664 1.136a.052.052 0 0 0-.024.02C1.4 8.023.76 11.424 1.074 14.782a.062.062 0 0 0 .024.042 14.923 14.923 0 0 0 4.494 2.272.058.058 0 0 0 .064-.02c.346-.473.654-.972.92-1.496a.057.057 0 0 0-.032-.08 9.83 9.83 0 0 1-1.404-.669.058.058 0 0 1-.029-.046.058.058 0 0 1 .023-.05c.094-.07.189-.144.279-.218a.056.056 0 0 1 .058-.008c2.946 1.345 6.135 1.345 9.046 0a.056.056 0 0 1 .059.007c.09.074.184.149.28.22a.058.058 0 0 1 .023.049.059.059 0 0 1-.028.046 9.224 9.224 0 0 1-1.405.669.058.058 0 0 0-.033.033.056.056 0 0 0 .002.047c.27.523.58 1.022.92 1.495a.056.056 0 0 0 .062.021 14.878 14.878 0 0 0 4.502-2.272.055.055 0 0 0 .016-.018.056.056 0 0 0 .008-.023c.375-3.883-.63-7.256-2.662-10.246a.046.046 0 0 0-.023-.021Zm-9.223 8.221c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.717 1.814-1.618 1.814Zm5.981 0c-.887 0-1.618-.814-1.618-1.814s.717-1.814 1.618-1.814c.908 0 1.632.821 1.618 1.814 0 1-.71 1.814-1.618 1.814Z" />
        </svg>
    );
}

function SocialLink({ href, icon: Icon, children }) {
    return (
        <Link href={href} className="group" target="_blank" rel="nofollow">
            <span className="sr-only">{children}</span>
            <Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500" />
        </Link>
    );
}

function SmallPrint() {
    return (
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="text-ens-light-text-secondary dark:text-ens-dark-text-secondary text-xs">
                &copy; Copyright {new Date().getFullYear()}. All rights
                reserved.
            </p>
            <div className="flex gap-4">
                <SocialLink href="https://x.com/ensdomains" icon={FaXTwitter}>
                    Follow us on X
                </SocialLink>
                <SocialLink
                    href="https://github.com/ensdomains"
                    icon={GitHubIcon}
                >
                    Follow us on GitHub
                </SocialLink>
                <SocialLink href="https://chat.ens.domains" icon={DiscordIcon}>
                    Join our Discord server
                </SocialLink>
            </div>
        </div>
    );
}

export const Footer: FC<{
    mdxProperties: MdxPageProps;
}> = ({ mdxProperties }) => {
    return (
        <footer className="border-t-ens-light-border dark:border-t-ens-dark-border w-full space-y-4 border-t pb-16 pt-4">
            <div className="flex flex-wrap items-end justify-between gap-2">
                <Feedback />
                <div className="w-fit">
                    <ContributeLink url={mdxProperties.filepath} />
                </div>
            </div>
            <SmallPrint />
        </footer>
    );
};
