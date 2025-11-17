// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentação',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'backend-docs',
        path: 'docs-source',
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    require.resolve('./plugins/sync-backend-docs'),
  ],

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: false,        // <<< DESLIGA O DOCS PADRÃO
        blog: false,        // <<< opcional
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: ({
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      items: [
        {
          type: 'docSidebar',
          docsPluginId: 'backend-docs',
          sidebarId: 'backend-docs',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} My Project`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;
