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

// main functions

const generateFormJS = (
  formId: string,
  listPage: string,
  fields: FormField[]
): string => {
  return `// config file
document.addEventListener("Validated", () => {
  document.getElementById("CreatedBy").value = nodeVue.selectedJob.nationalCode;
});

////formLoad Event
document.addEventListener("formLoad", async () => {
  document.getElementById("ModifiedBy").value =
    nodeVue.selectedJob.nationalCode;
  document.getElementById("ModifiedDate").value = moment().format();
});

const formData = {
  formName: "${formId}",
  listLink: "${listPage}",
  formFields: [
    // default field
    { name: "CreatedBy", type: 1 },
    // regular fields
${generateRegularFields(fields)}  ],
  subFormData: [],
};

//<AryanicCMS:tags:36>`;
};

const generateFormHTML = (
  title: string,
  fieldPerRow: number,
  fields: FormField[]
): string => {
  return `<table
  class="my-6 shadow-lg bg-white dark:bg-gray-800 table-auto formtable"
  style="font-family: tahoma; font-size: 9pt"
  dir="rtl"
  border="0"
  cellspacing="2"
  cellpadding="2"
  width="100%"
>
  <tbody>
    <tr class="mainTr">
      <td>
        <span class="font-bold"> ${title} </span>
        <input type="hidden" name="FPID" />
        <input type="hidden" name="FOPID" />
        <input type="hidden" name="AryanicAformEditRecordId" />
        <input type="hidden" name="CreatedBy" />
        <input type="hidden" name="ModifiedBy" />
        <input type="hidden" name="ModifiedDate" />
      </td>
    </tr>
${generateFormHtmlFields(fields, fieldPerRow)}    <tr>
      <td>
        <input class="nothidden" value="ثبت" type="submit" name="submit" />
      </td>
    </tr>
  </tbody>
</table>`;
};

const generateFormLIST = (
  formId: string,
  formPage: string,
  showProject: boolean,
  formSelf: FormData
): string => {
  return `<AryanicCMS:tags:44>
  const formData = {
    formName: '${formId}',
    formLink: '${formPage}',
    formJoinString: '${
      showProject
        ? "left join form_40 on " +
          formId +
          ".FPID = form_40.id and form_40.del = 0"
        : ""
    }',
    formFields: [
${generateListFields(formSelf)}    ],
    projectFilterField: "${formId}.FPID",
    pageSize: 10,
    data: [],
  }
<AryanicCMS:tags:45>`;
};

// main functions

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

export { typeItems, generateFormJS, generateFormHTML, generateFormLIST };
