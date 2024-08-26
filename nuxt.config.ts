import * as dotenv from "dotenv";
dotenv.config({
  path: `./env/main.${process.env.NODE_ENV}.env`,
  override: false,
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@sidebase/nuxt-auth", "@pinia/nuxt", "@vueuse/nuxt"],
  plugins: ["~/plugins/plugins"],
  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signOut: {
          path: "/auth/logout",
          method: "post",
        },
        signIn: {
          path: "/auth/entrance",
          method: "post",
        },
        signUp: {
          path: "/auth/signup",
          method: "post",
        },
        getSession: {
          path: "/auth/session",
          method: "get",
        },
      },
      sessionDataType: {
        userInformations: "UserInformations",
        userPositions: "JobData[]",
      },
      token: {
        maxAgeInSeconds: 60 * 60 * 24,
      },
      // @ts-ignore
      // refreshToken: {
      //   maxAgeInSeconds: 60 * 60 * 24,
      // },
    },
    globalAppMiddleware: {
      isEnabled: true,
    },
  },

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
});
