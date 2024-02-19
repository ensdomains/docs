export const Properties = ({ children }) => {
    return (
        <div className="my-6">
            <ul className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5">
                {children}
            </ul>
        </div>
    );
};
