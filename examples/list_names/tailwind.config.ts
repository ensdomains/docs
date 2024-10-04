import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    plugins: [
        plugin(({ addVariant, matchVariant, theme }) => {
            // Tailwind variant for not disabled
            addVariant('not-disabled', ['&:not([disabled])']);

            matchVariant('vh', (value) => `@media (min-height: ${value})`, {
                values: theme('screens'),
            });

            matchVariant('max-vh', (value) => `@media (max-height: ${value})`, {
                values: theme('screens'),
            });
        }),
    ],
    theme: {
        fontFamily: {
            sans: ['Satoshi', 'sans-serif'],
            serif: ['Mitr', 'sans-serif'],
        },
        extend: {
            screens: {
                xs: '480px',
            },
            maxWidth: {
                '8xl': '1440px',
            },
            aspectRatio: {
                cover: '1920 / 1080',
            },
            colors: {
                ens: {
                    blue: '#5298FF',
                    blue2: 'rgba(82, 152, 255, 0.6)',
                    blue3: 'rgba(82, 152, 255, 0.25)',
                    green: '#49B393',
                    indigo: '#5854D6',
                    orange: '#FF9500',
                    pink: '#FF2D55',
                    purple: '#AF52DE',
                    red: '#D55555',
                    teal: '#5AC8FA',
                    yellow: '#E8B811',
                    grey1: '#F6F6F6',
                    grey2: '#9B9BA7',
                    grey3: '#454545',
                    'gradient-blue':
                        'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                    'gradient-purple':
                        'linear-gradient(323.31deg, #DE82FF -15.56%, #7F6AFF 108.43%)',
                    'gradient-green':
                        'linear-gradient(323.31deg, #73A6F2 -15.56%, #42C2AB 108.43%)',
                },
            },
            borderRadius: {
                ens: '16px',
            },
        },
    },
};

export default config;
