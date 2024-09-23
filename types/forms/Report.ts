import type { FormField } from "./FormData";

interface ReportData {
  title: string;
  formId: string;
  showProject: boolean;
  tagId: string;
  unit: string;
  showFields: FormField[];
}

export type { ReportData };
