// stores/snackbar.ts
import { defineStore } from "pinia";
import type { FormField } from "~/data/formsData";

export const useReportStore = defineStore("report", {
  state: () => ({
    fields: [] as FormField[],
  }),
  actions: {
    setFields(fields: FormField[], formId: string) {
      this.fields = fields;
    },
  },
});
