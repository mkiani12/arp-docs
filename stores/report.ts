// stores/snackbar.ts
import { defineStore } from "pinia";
import type { FormField } from "~/types/forms/FormData";

export const useReportStore = defineStore("report", {
  state: () => ({
    fields: [] as FormField[],
    formTitle: "",
    formId: "",
  }),
  actions: {
    setFields(fields: FormField[], formId: string, formTitle: string) {
      this.formTitle = formTitle;
      this.formId = formId;
      this.fields = fields;
    },
  },
});
