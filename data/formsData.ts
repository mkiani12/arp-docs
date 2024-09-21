import type { FormData, FormField, TypeItem } from "~/types/forms/FormData";

const typeItems: TypeItem[] = [
  {
    title: "تکست باکس",
    value: "textbox",
  },
  {
    title: "سلکت باکس",
    value: "select",
  },
  {
    title: "تکست",
    value: "textarea",
  },
  {
    title: "رادیو",
    value: "radio",
  },
  {
    title: "چک باکس",
    value: "checkbox",
  },
  {
    title: "عکس",
    value: "image",
  },
  {
    title: "فایل",
    value: "file",
  },
];

const generateRegularFields = (fields: FormField[]): string => {
  let result = "";
  for (const element of fields) {
    if (element.lname) {
      result += `    { name: "${element.lname}", type: ${convertTypeToNumber(
        element.type
      )} }, \n`;
    }
  }
  return result;
};

const generateListFields = (formData: FormData): string => {
  let result = "";
  for (const field of formData.selectedListFields) {
    const element = formData.fields.find((el) => el.lname == field);
    if (element) {
      result += `        { text: '${
        element.listName || element.name
      }', value: '${formData.id}.${element.lname}' }, \n`;
    }
  }
  if (formData.listShowProject) {
    result += `        { text: 'پروژه', value: 'form_40.Project' }, \n`;
  }
  return result;
};

const generateFormHtmlFields = (
  fields: FormField[],
  fieldPerRow: number
): string => {
  let result = "";

  const slicedArrays = sliceArray(fields, fieldPerRow);

  result = generateFields(slicedArrays);

  return result;
};

const generateFields = (fields: FormField[][]): string => {
  let result = "";

  for (const fieldArray of fields) {
    let cols = "";
    for (const field of fieldArray) {
      cols += convertFieldToHtml(field);
    }
    let row = `    <tr class="mainTr">
      <td>
        <div
          class="flex flex-col md:flex-row gap-[0.5rem] w-full justify-right"
        >
${cols}        </div>
      </td>
    </tr>\n`;
    result += row;
  }

  return result;
};

const convertFieldToHtml = (field: FormField): string => {
  let result = "";
  switch (field.type) {
    case "textbox":
      result = `            <input
              class="w-full"
              type="textbox"
              name="${field.lname}"
              uname="${field.name}"
              size="30"
              maxlength="100"
              dir="rtl"
              fieldt="string"
              valid1="Disabled"
              valid2="Disabled"
            />\n`;
      break;
    case "select":
      result = `            <select
              class="w-full"
              name="${field.lname}"
              uname="${field.name}"
              conn="~"
              relation="none"
              dir="rtl"
              maxlength=""
            >
            </select>`;
      break;
    case "textarea":
      result = `            <textarea
              class="w-full"
              name="${field.lname}"
              uname="${field.name}"
              cols="30"
              rows="3"
              dir="rtl"
              fieldt="string"
              valid1="Disabled"
              valid2="Disabled"
            ></textarea>`;
      break;
    case "file":
      break;
    case "checkbox":
      break;
    case "image":
      break;
    case "radio":
      break;
  }
  return result;
};

const sliceArray = (array: Array<any>, size: number) => {
  const slicedArrays = [];
  for (let i = 0; i < array.length; i += size) {
    slicedArrays.push(array.slice(i, i + size));
  }
  return slicedArrays;
};

const convertTypeToNumber = (type: string): number => {
  if (type == "textbox" || type == "select" || type == "textarea") {
    return 1;
  }
  if (type == "radio") {
    return 2;
  }
  if (type == "checkbox") {
    return 3;
  }
  if (type == "image") {
    return 4;
  }
  if (type == "file") {
    return 5;
  } else {
    return 0;
  }
};

export {
  typeItems,
  generateRegularFields,
  generateListFields,
  generateFormHtmlFields,
};
