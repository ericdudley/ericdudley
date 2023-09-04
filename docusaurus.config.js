// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const LINKEDIN_URL = "https://www.linkedin.com/in/eric-dudley-894721106/";
const GITHUB_URL = "https://github.com/ericdudley";
const INSTAGRAM_URL = "https://www.instagram.com/unexpected.ericdudley/";
const SOUNDCLOUD_URL = "https://soundcloud.com/eric-dudley-140295232";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Eric Dudley",
  tagline: "Eric Dudley, portfolio and blog",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://ericdudley.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  customFields: {
    links: {
      linkedin: LINKEDIN_URL,
      github: GITHUB_URL,
      instagram: INSTAGRAM_URL,
      soundcloud: SOUNDCLOUD_URL,
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-37XQKM83P9",
        },
      }),
    ],
  ],

  plugins: [
    async function tailwindCssPlugin(_context, _options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 90,
        max: 1024,
        min: 512,
        steps: 2,
        disableInDev: false,
      },
    ],
    // Add back in to have multiple blog variants
    // [
    //   "@docusaurus/plugin-content-blog",
    //   {
    //     /**
    //      * Required for any multi-instance plugin
    //      */
    //     id: "second-blog",
    //     /**
    //      * URL route for the blog section of your site.
    //      * *DO NOT* include a trailing slash.
    //      */
    //     routeBasePath: "my-second-blog",
    //     /**
    //      * Path to data on filesystem relative to site dir.
    //      */
    //     path: "./my-second-blog",
    //   },
    // ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/me.png",
      navbar: {
        logo: {
          alt: "Eric Dudley",
          src: "img/me.png",
        },
        title: "Eric Dudley",
        items: [{ to: "/blog", label: "Blog", position: "left" }],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "My Links",
            items: [
              {
                label: "LinkedIn",
                href: LINKEDIN_URL,
              },
              {
                label: "GitHub",
                href: GITHUB_URL,
              },
              {
                label: "Instagram",
                href: INSTAGRAM_URL,
              },
              {
                label: "SoundCloud",
                href: SOUNDCLOUD_URL,
              },
              {
                label: "Blog",
                to: "/blog",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
