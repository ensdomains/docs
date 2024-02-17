import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';

function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none');
    window.setTimeout(() => {
        document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 0);
}

function toggleMode() {
    disableTransitionsTemporarily();

    const darkModeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
    );
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle('dark');

    if (isDarkMode === isSystemDarkMode) {
        delete window.localStorage.isDarkMode;
    } else {
        window.localStorage.isDarkMode = isDarkMode;
    }
}

export function ModeToggle() {
    return (
        <button
            type="button"
            className="flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            aria-label="Toggle dark mode"
            onClick={toggleMode}
        >
            <SunIcon className="size-5 stroke-zinc-900 dark:hidden" />
            <MoonIcon className="hidden size-5 stroke-white dark:block" />
        </button>
    );
}
