import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'ENS',
  rootDir: 'src',
  font: {
    google: 'Inter',
  },
  theme: {
    colorScheme: 'light',
    variables: {
      color: {
        text: 'var(--ens-grey-active)',
        textAccent: 'var(--ens-blue-dim)',
        backgroundAccent: 'var(--ens-blue-primary)',
        backgroundAccentHover: 'var(--ens-blue-bright)',
      },
    },
  },
  // sidebar: [
  //   {
  //     text: 'Getting Started',
  //     link: '/getting-started',
  //   },
  //   {
  //     text: 'Example',
  //     link: '/example',
  //   },
  // ],
})
