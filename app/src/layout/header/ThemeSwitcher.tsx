'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeSwitcher = () => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <button
            className="p-1"
            onClick={() => {
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
            }}
        >
            <div className="bg-ens-light-background-secondary dark:bg-ens-dark-background-secondary relative flex gap-2 rounded-xl p-1 text-sm">
                <div
                    className={clsx(
                        'absolute inset-0 h-full transition-all duration-500'
                    )}
                >
                    <div
                        className={clsx(
                            'bg-ens-light-blue-primary absolute aspect-square h-full rounded-full transition-all duration-300'
                        )}
                        style={{
                            // @ts-ignore
                            '--knob-size': '50%',
                            left:
                                resolvedTheme == 'dark'
                                    ? '0px'
                                    : 'calc(100% - var(--knob-size))',
                        }}
                    ></div>
                </div>
                <FiMoon
                    className={clsx(
                        'relative z-20',
                        resolvedTheme == 'dark' && 'text-white'
                    )}
                />
                <FiSun
                    className={clsx(
                        'relative z-20',
                        resolvedTheme != 'dark'
                            ? 'text-ens-light-text-accent dark:text-ens-light-text-accent'
                            : 'text-ens-light-text-secondary dark:text-ens-dark-text-secondary'
                    )}
                />
            </div>
        </button>
    );
};
