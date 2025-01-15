/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,md,mdx,tsx,js,jsx}'],
  theme: {
    // Reset Tailwind default colors
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      zinc: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
      },
      blue: {
        active: 'var(--ens-blue-active)',
        dim: 'var(--ens-blue-dim)',
        DEFAULT: 'var(--ens-blue-primary)',
        bright: 'var(--ens-blue-bright)',
        light: 'var(--ens-blue-light)',
        surface: 'var(--ens-blue-surface)',
      },
      indigo: {
        active: 'var(--ens-indigo-active)',
        dim: 'var(--ens-indigo-dim)',
        DEFAULT: 'var(--ens-indigo-primary)',
        bright: 'var(--ens-indigo-bright)',
        light: 'var(--ens-indigo-light)',
        surface: 'var(--ens-indigo-surface)',
      },
      purple: {
        active: 'var(--ens-purple-active)',
        dim: 'var(--ens-purple-dim)',
        DEFAULT: 'var(--ens-purple-primary)',
        bright: 'var(--ens-purple-bright)',
        light: 'var(--ens-purple-light)',
        surface: 'var(--ens-purple-surface)',
      },
      pink: {
        active: 'var(--ens-pink-active)',
        dim: 'var(--ens-pink-dim)',
        DEFAULT: 'var(--ens-pink-primary)',
        bright: 'var(--ens-pink-bright)',
        light: 'var(--ens-pink-light)',
        surface: 'var(--ens-pink-surface)',
      },
      red: {
        active: 'var(--ens-red-active)',
        dim: 'var(--ens-red-dim)',
        DEFAULT: 'var(--ens-red-primary)',
        bright: 'var(--ens-red-bright)',
        light: 'var(--ens-red-light)',
        surface: 'var(--ens-red-surface)',
      },
      orange: {
        active: 'var(--ens-orange-active)',
        dim: 'var(--ens-orange-dim)',
        DEFAULT: 'var(--ens-orange-primary)',
        bright: 'var(--ens-orange-bright)',
        light: 'var(--ens-orange-light)',
        surface: 'var(--ens-orange-surface)',
      },
      yellow: {
        active: 'var(--ens-yellow-active)',
        dim: 'var(--ens-yellow-dim)',
        DEFAULT: 'var(--ens-yellow-primary)',
        bright: 'var(--ens-yellow-bright)',
        light: 'var(--ens-yellow-light)',
        surface: 'var(--ens-yellow-surface)',
      },
      green: {
        active: 'var(--ens-green-active)',
        dim: 'var(--ens-green-dim)',
        DEFAULT: 'var(--ens-green-primary)',
        bright: 'var(--ens-green-bright)',
        light: 'var(--ens-green-light)',
        surface: 'var(--ens-green-surface)',
      },
      grey: {
        active: 'var(--ens-grey-active)',
        dim: 'var(--ens-grey-dim)',
        DEFAULT: 'var(--ens-grey-primary)',
        bright: 'var(--ens-grey-bright)',
        light: 'var(--ens-grey-light)',
        surface: '#F6F6F6',
      },
    },
    extend: {},
  },
  plugins: [],
}
