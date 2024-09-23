import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import sql from "highlight.js/lib/languages/sql";
import highlightJS from "@highlightjs/vue-plugin";
import "highlight.js/styles/atom-one-dark.css";

export default defineNuxtPlugin((nuxtApp) => {
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("html", html);
  hljs.registerLanguage("sql", sql);
  nuxtApp.vueApp.use(highlightJS);
});
