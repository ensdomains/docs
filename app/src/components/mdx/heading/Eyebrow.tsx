import { Tag } from '@/components/Tag';

export const Eyebrow = ({ tag, label }) => {
    if (!tag && !label) {
        return;
    }

    return (
        <div className="flex items-center gap-x-3">
            {tag && <Tag>{tag}</Tag>}
            {tag && label && (
                <span className="size-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            )}
            {label && (
                <span className="font-mono text-xs text-zinc-400">{label}</span>
            )}
        </div>
    );
};
