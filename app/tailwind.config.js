const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './{pages,app,src,mdx}/**/*.{js,mjs,jsx,mdx,tsx}',
        '../docs/**/*.{mdx,ts}',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        fontSize: {
            '3xs': ['0.625rem', { lineHeight: '1rem' }],
            '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
            xs: ['0.8125rem', { lineHeight: '1.5rem' }],
            sm: ['0.875rem', { lineHeight: '1.5rem' }],
            base: ['1rem', { lineHeight: '1.75rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
        },
        typography: require('./src/typography'),
        extend: {
            blur: {
                xs: '0.8px',
            },
            boxShadow: {
                glow: '0 0 4px rgb(0 0 0 / 0.1)',
            },
            maxWidth: {
                lg: '33rem',
                '2xl': '40rem',
                '3xl': '50rem',
                '5xl': '66rem',
            },
            opacity: {
                1: '0.01',
                2.5: '0.025',
                7.5: '0.075',
                15: '0.15',
            },
            colors: {
                searchbar: '#262929',
                ens: {
                    light: {
                        blue: {
                            DEFAULT: '#5298FF',
                            50: '#FFFFFF',
                            100: '#F5F9FF',
                            200: '#CCE1FF',
                            300: '#A4C9FF',
                            400: '#7BB0FF',
                            500: '#5298FF',
                            600: '#1A77FF',
                            700: '#005BE1',
                            800: '#0044A9',
                            900: '#002E71',
                            active: '#003685',
                            dim: '#056AFF',
                            primary: '#3889FF',
                            bright: '#569AFF',
                            light: '#D1E4FF',
                            surface: '#EEF5FF',
                        },
                        indigo: {
                            active: '#19175F',
                            dim: '#342FC5',
                            primary: '#5854D6',
                            bright: '#7E7BDF',
                            light: '#C7C5F1',
                            surface: '#E3E2F8',
                        },
                        purple: {
                            active: '#3D1353',
                            dim: '#8A2BBA',
                            primary: '#A343D3',
                            bright: '#B86EDD',
                            light: '#E3C6F1',
                            surface: '#EBD6F5',
                        },
                        pink: {
                            active: '#440E28',
                            dim: '#AE2366',
                            primary: '#D52E7E',
                            bright: '#DE5999',
                            light: '#F4CDE0',
                            surface: '#EBD6F5',
                        },
                        red: {
                            active: '#280A06',
                            dim: '#992515',
                            primary: '#C6301B',
                            bright: '#E34631',
                            light: '#F0C2C2',
                            surface: '#F9E7E7',
                        },
                        orange: {
                            active: '#492C03',
                            dim: '#C37609',
                            primary: '#F3930B',
                            bright: '#F6A93C',
                            light: '#FBE1BC',
                            surface: '#FDF0DD',
                        },
                        yellow: {
                            active: '#423505',
                            dim: '#B9930E',
                            primary: '#E9B911',
                            bright: '#F0C93C',
                            light: '#FFEFAD',
                            surface: '#FFF5CD',
                        },
                        green: {
                            active: '#072C21',
                            dim: '#158463',
                            primary: '#199C75',
                            bright: '#1EB789',
                            light: '#CBE7DC',
                            surface: '#E7F4EF',
                        },
                        grey: {
                            active: '#1E2122',
                            dim: '#595959',
                            primary: '#9B9BA7',
                            bright: '#B6B6BF',
                            light: '#E8E8E8',
                            surface: '#F6F6F6',
                        },
                        text: {
                            primary: '#1E2122',
                            secondary: '#9B9BA7',
                            accent: '#FFFFFF',
                            disabled: '#B6B6BF',
                        },
                        background: {
                            primary: '#FFFFFF',
                            secondary: '#F6F6F6',
                            disabled: '#E8E8E8',
                        },
                        // Additional
                        border: '#E8E8E8',
                    },
                    dark: {
                        blue: {
                            active: '#EEF5FF',
                            dim: '#D1E4FF',
                            primary: '#3889FF',
                            bright: '#056AFF',
                            light: '#0C4597',
                            surface: '#20395F',
                        },
                        indigo: {
                            active: '#E3E2F8',
                            dim: '#C7C5F1',
                            primary: '#6B67E9',
                            bright: '#342FC5',
                            light: '#221E90',
                            surface: '#23216D',
                        },
                        purple: {
                            active: '#EBD6F5',
                            dim: '#E3C6F1',
                            primary: '#A343D3',
                            bright: '#8A2BBA',
                            light: '#5E1683',
                            surface: '#42145A',
                        },
                        pink: {
                            active: '#FAE8F1',
                            dim: '#F4CDE0',
                            primary: '#D52E7E',
                            bright: '#AE2366',
                            light: '#761544',
                            surface: '#5B1135',
                        },
                        red: {
                            active: '#F9E7E7',
                            dim: '#F0C2C2',
                            primary: '#C6301B',
                            bright: '#A72614',
                            light: '#7F1313',
                            surface: '#3F2424',
                        },
                        orange: {
                            active: '#FDF0DD',
                            dim: '#FBE1BC',
                            primary: '#F3930B',
                            bright: '#C37609',
                            light: '#6D4308',
                            surface: '#583503',
                        },
                        yellow: {
                            active: '#FFF5CD',
                            dim: '#FFEFAD',
                            primary: '#E9B911',
                            bright: '#B9930E',
                            light: '#5C4B0C',
                            surface: '#373222',
                        },
                        green: {
                            active: '#E7F4EF',
                            dim: '#CBE7DC',
                            primary: '#199C75',
                            bright: '#158463',
                            light: '#104A38',
                            surface: '#153C31',
                        },
                        grey: {
                            active: '#F6F6F6',
                            dim: '#E8E8E8',
                            primary: '#9B9BA7',
                            bright: '#5D5C62',
                            light: '#424347',
                            surface: '#141416',
                        },
                        text: {
                            primary: '#FFFFFF',
                            secondary: '#9B9BA7',
                            accent: '##FFFFFF',
                            disabled: '#5D5C62',
                        },
                        background: {
                            primary: '#1E2122',
                            secondary: '#141416',
                            disabled: '##424347',
                        },
                        // Additional
                        border: '#42464E',
                    },
                },
                'ens-dao': {
                    400: '#AD76FF', // Core
                    500: '#8F54FF',
                },
                'ens-red': {
                    DEFAULT: '#FF2D55',
                    50: '#FFE5EA',
                    100: '#FFD0D9',
                    200: '#FFA7B8',
                    300: '#FF7F97',
                    400: '#FF5676',
                    500: '#FF2D55',
                    600: '#F4002E',
                    700: '#BC0024',
                    800: '#840019',
                    900: '#4C000E',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
