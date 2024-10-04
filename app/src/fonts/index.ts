import { EB_Garamond, Erica_One, Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
    weight: 'variable',
    variable: '--ens-sans-fb',
    subsets: ['cyrillic'],
});

export const ebGaramond = EB_Garamond({
    weight: 'variable',
    variable: '--ens-serif-fb',
    subsets: ['cyrillic'],
});

export const ericaOne = Erica_One({
    weight: '400',
    variable: '--ens-title',
    subsets: ['latin'],
});

export const ABCMonumentGrotesk = localFont({
    src: './variable.woff2',
    variable: '--ens-sans',
    fallback: ['var(--ens-sans-fb)', 'sans-serif'],
});

export const ABCMonumentGroteskMono = localFont({
    src: [
        {
            weight: '400',
            path: './mono/regular.woff2',
            style: 'normal',
        },
        {
            weight: '400',
            path: './mono/italic.woff2',
            style: 'italic',
        },
        {
            weight: '500',
            path: './mono/medium.woff2',
            style: 'normal',
        },
        {
            weight: '500',
            path: './mono/medium-italic.woff2',
            style: 'italic',
        },
    ],
    variable: '--ens-mono',
});

export const ABCMonumentGroteskSemiMono = localFont({
    src: [
        {
            weight: '400',
            path: './semi-mono/regular.woff2',
            style: 'normal',
        },
        {
            weight: '400',
            path: './semi-mono/italic.woff2',
            style: 'italic',
        },
        {
            weight: '500',
            path: './semi-mono/medium.woff2',
            style: 'normal',
        },
        {
            weight: '500',
            path: './semi-mono/medium-italic.woff2',
            style: 'italic',
        },
    ],
    variable: '--ens-semi-mono',
    fallback: ['monospace'],
});

export const ABCMarist = localFont({
    src: [
        {
            weight: '400',
            path: './serif/regular.woff2',
            style: 'normal',
        },
        {
            weight: '400',
            path: './serif/italic.woff2',
            style: 'italic',
        },
    ],
    variable: '--ens-serif',
    fallback: ['var(--ens-serif-fb)', 'serif'],
});
