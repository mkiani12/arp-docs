import type { FormField } from "./FormData";

interface ReportData {
  title: string;
  formId: string;
  showProject: boolean;
  showFields: FormField[];
}

export type { ReportData };
