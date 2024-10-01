interface TypeItem {
  title: string;
  value: string;
}

type FieldTypes =
  | "textbox"
  | "select"
  | "textarea"
  | "radio"
  | "checkbox"
  | "image"
  | "file";

type FileFieldOptions = {};
type CheckboxFieldOptions = {};
type RadioFieldOptions = {};

type SelectFieldOptions = {
  selectOptions: TypeItem[];
};

type RegularFieldOptions = {};

interface FormField {
  type: FieldTypes;
  name: string;
  lname: string;
  listName?: string;
  options?:
    | FileFieldOptions
    | CheckboxFieldOptions
    | RadioFieldOptions
    | SelectFieldOptions
    | RegularFieldOptions;
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
