import * as dotenv from "dotenv";
dotenv.config({
  path: `./env/main.${process.env.NODE_ENV}.env`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "ARP-GR - AbadRahan Pars International Group",
      titleTemplate: "%s - ARP-GR",
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: {
      name: "slide",
      mode: "out-in",
    },
  },

  modules: ["@pinia/nuxt", "@vueuse/nuxt", "unplugin-icons/nuxt"],
  plugins: ["~/plugins/plugins"],
  ssr: false,

  typescript: {
    shim: false,
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  nitro: {
    serveStatic: true,
  },

  devServer: {
    port: parseInt(process.env.PORT ?? "3000"),
  },

  devServerHandlers: [],
  hooks: {},
  compatibilityDate: "2024-09-02",
});
