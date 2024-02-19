import Link from 'next/link';

export const AnchorIcon = (properties) => {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            strokeLinecap="round"
            aria-hidden="true"
            {...properties}
        >
            <path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
        </svg>
    );
};

export const Anchor = ({ id, inView, children }) => {
    return (
        <div className="group flex items-center gap-1">
            {children}
            <Link
                href={`#${id}`}
                className="text-inherit no-underline hover:text-inherit"
            >
                {inView && (
                    <div className="transition group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50">
                        <div className="group/anchor w-5transition block h-5">
                            <AnchorIcon className="size-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white" />
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
};
