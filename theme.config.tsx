import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>GENCG.FS23 Kim Jeker</span>,
  darkMode: false,
  nextThemes: {
    forcedTheme: "dark",
  },
  faviconGlyph: "G",
  project: {
    link: "https://github.com/kije/gencg_f2301",
  },
  docsRepositoryBase: "https://github.com/kije/gencg_f2301/tree/journal",
  footer: {
    text: "HSLU - Generative Computer Graphics - Fall 2023",
  },
};

export default config;
