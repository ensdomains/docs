import { FC } from 'react';

export const WIP: FC<{ missing?: string[] }> = ({ missing }) => {
    return (
        <div>
            <div className="not-prose rounded-md border border-ens-light-yellow-bright bg-ens-light-yellow-surface p-6 dark:border-ens-dark-yellow-bright dark:bg-ens-dark-yellow-surface">
                <h2 className="text-xl font-bold text-ens-light-yellow-dim dark:text-ens-dark-yellow-dim">
                    🚧 This page is work in progress 🚧
                </h2>
                <p className="mt-2">
                    🏗️👷This page is still under construction. Check back at a
                    later date to see more!
                </p>
                {missing && (
                    <div>
                        <div>This page is still missing:</div>
                        <ul className="px-4">
                            {missing.map((m, index) => (
                                <li key={index}>- {m}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
