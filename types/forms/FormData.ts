interface TypeItem {
  title: string;
  value: string;
}

interface FormField {
  type:
    | "textbox"
    | "select"
    | "textarea"
    | "radio"
    | "checkbox"
    | "image"
    | "file";
  name: string;
  lname: string;
  listName?: string;
}

interface FormData {
  title: string;
  id: string;
  page: string;
  listPage: string;
  fields: FormField[];
  fieldPerRow: number;
  selectedListFields: string[];
  listShowProject: boolean;
}

export type { TypeItem, FormField, FormData };
