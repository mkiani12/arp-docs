import type { FormField } from "~/types/forms/FormData";

// main functions

const generateReportHTML = (
  title: string,
  formId: string,
  tagId: string,
  unit: string,
  showProject: boolean,
  fields: FormField[]
): string => {
  return `<div class="container p-4 mx-auto">
  <!--header Card-->
  <div
    class="flex mb-2 p-2 bg-blue-900 dark:bg-gray-800 rounded-lg items-center justify-between"
  >
    <div class="flex items-center justify-center">
      <div id="projectDiv" class="flex flex-col w-full hidden">
        <select
          class="w-full h-full py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg text-center"
          id="ProjectID"
          onchange="projectChange(this)"
        ></select>
      </div>
    </div>
    <div class="flex gap-2 flex-row justify-center">
      <div
        class="flex mr-2 px-2 py-1 border border-white text-white duration-500 shadow rounded-lg cursor-pointer pwt-datepicker-input-element items-center justify-center gap-1"
        onclick="ExportToExcel('.xlsx')"
      >
        <span>اکسل</span>
        <span class="material-symbols-outlined">download</span>
      </div>
      <div
        class="flex mr-2 px-2 py-1 border border-white text-white duration-500 shadow rounded-lg cursor-pointer pwt-datepicker-input-element items-center justify-center gap-1"
        onclick="printdiv('print_this','Landscape','0.5cm')"
      >
        <span>چاپ</span>
        <span class="material-symbols-outlined">print</span>
      </div>
    </div>
  </div>
  <section id="print_this" class="w-full mb-4">
    <table
      class="nazanin-fd mb-6 bg-white dark:bg-gray-800 table-auto formtable"
      style="font-family: tahoma; font-size: 10px"
      dir="rtl"
      border="1"
      cellspacing="2"
      cellpadding="2"
      width="100%"
      bordercolor="#000000"
    >
      <thead>
        <tr>
          <td
            class="w-3/12 h-[100px] px-4 border border-blue-500 text-cenetr"
            colspan="3"
          >
            <div class="flex items-center justify-center">
              <img
                id="img_logo"
                src="http://bpm.arp-gr.com/uploads/لوگو_گروه_بین‌المللی_آبادراهان_پارس.jpg"
                style="width: 120px"
              />
            </div>
          </td>
          <td
            class="w-6/12 h-[100px] px-4 border border-blue-500 text-xl font-bold text-center relative"
            colspan="6"
          >
            <div class="flex flex-col gap-1 w-full">
              <h3>
                ${title}
                <span id="project-text" class="mr-2"></span>
              </h3>
              <h3>${unit}</h3>
            </div>
          </td>
          <td
            class="w-3/12 h-[100px] px-4 border border-blue-500 text-xl text-right"
            colspan="3"
          >
            <div class="flex flex-col gap-1 w-full">
              <div>
                <label>تاریخ: </label>
                <span id="dateReport"></span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="p-4 border border-x-0 border-black text-sm text-right"
            colspan="12"
          ></td>
        </tr>
      </thead>
      <tbody id="tb1">
        <tr>
          <td class="w-4/4" colspan="12" style="padding: 0">
            <table
              id="tbl_Header"
              border="1"
              width="100%"
              bordercolor="#000000"
              class="formtable text-[18px]"
              id="t1"
            >
              <thead>
                <tr class="bg-blue-100 dark:bg-blue-500 font-bold">
                  <th
                    class="w-[5%] p-2 border border-t-0 border-black text-center"
                  >
                    ردیف
                  </th>
${generateTableHead(fields, showProject)}                </tr>
              </thead>
              <tbody id="tbody"></tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</div>
<script>
  document.addEventListener("Validated", async () => {
    if (
      nodeVue.selectedJob.projectId == 19 ||
      nodeVue.appPremission.superuser
    ) {
      document.getElementById("projectDiv").classList.remove("hidden");
      await createProjectOption(true, true); // (allProject,central)
      getReport("");
    } else {
      getReport(\`and ${formId}.FPID=\${nodeVue.selectedJob.projectId}\`);
    }
  });
  //<AryanicCMS:tags:116>

  async function projectChange(e) {
    if (
      e.value != "donotselect" &&
      e.value != "activeProjects" &&
      e.value != "allProjects"
    ) {
      const text = e.options[e.selectedIndex].innerHTML;
      document.getElementById("project-text").innerHTML = " - " + text;
      getReport(\`and ${formId}.FPID=\${e.value}\`);
    } else {
      document.getElementById("project-text").innerHTML = " - گزارش کل";
      getReport("");
    }
  }

  //// Termination Of Cooperation
  async function getReport(condition) {
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("dateReport").innerHTML = moment()
      .locale("fa")
      .format("jYYYY/jMM/jDD");

    await axios
      .post("/includes/services.aspx?serviceid=${tagId}", \`con=\${condition}\`)
      .then((result) => {
        result.data.pop();
        let data = result.data;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            let trElem = document.createElement("tr");
            trElem.setAttribute(
              "style",
              "page-break-inside: avoid; page-break-after: auto;"
            );
            if (i % 2 != 0)
              trElem.setAttribute("class", "bg-gray-100 dark:bg-gray-700");
            
            trElem.innerHTML = \`
                                    <td class="w-[5%] p-2 border border-black text-center">
                                        \${i + 1}
                                    </td>
${generateReportColumns(fields, showProject)}            \`;
            document.getElementById("tbody").append(trElem);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        nodeVue.notif("error", "گزارشی موجود نیست!", 3000);
      });
  }

  //// Print Button
  async function printdiv(element, size, margin) {
    const style = document.createElement("style");
    style.textContent = \`@page {size:\${size};}\`;
    document.head.appendChild(style);
    let divPrint = document.createElement("div");
    divPrint.setAttribute(
      "class",
      "z-10 w-full bg-white absolute top-0 right-0"
    );
    let printContents = document.getElementById(element).innerHTML;
    divPrint.innerHTML = printContents;
    document.body.append(divPrint);
    document.getElementById("app").classList.add("hidden");
    document.getElementById("app").classList.remove("lg:flex");
    setTimeout(() => {
      window.print();
      divPrint.remove();
      document.getElementById("app").classList.add("lg:flex");
      document.getElementById("app").classList.remove("hidden");
    }, 500);
  }
  ///Excel Button
  function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById("tbl_Header");
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl
      ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
      : XLSX.writeFile(wb, fn || "${title}" + (type || "xlsx"));
  }
</script>
`;
};

const generateReportTAG = (
  formId: string,
  showProject: boolean,
  fields: FormField[]
): string => {
  return `select 
${generateTagFields(fields, showProject, formId)}from
    ${formId}${
    showProject
      ? "\n    left join form_40 on " +
        formId +
        ".FPID = form_40.id and form_40.del = 0"
      : ""
  }
where
    ${formId}.del = 0
    {post:con}`;
};

// main functions

const generateTableHead = (
  fields: FormField[],
  showProject: boolean
): string => {
  let result = showProject
    ? `                  <th class="p-2 border border-t-0 border-black text-center">
                    پروژه
                  </th>\n`
    : "";
  for (const element of fields) {
    result += `                  <th class="p-2 border border-t-0 border-black text-center">
                    ${element.name}
                  </th>\n`;
  }
  return result;
};

const generateReportColumns = (
  fields: FormField[],
  showProject: boolean
): string => {
  let result = showProject
    ? `                                    <td class="p-2 border border-black text-center">
                                          \${data[i].Project}
                                    </td>\n`
    : "";

  for (const element of fields) {
    let col = "";
    if (element.type == "file") {
      col = `                                    <td class="print:hidden p-4 border border-black text-center">
                                        \${
                                          data[i].${element.lname} != ""
                                            ? \`
                                          <a href="\${data[i].${element.lname}}" download>
                                            <span class="material-symbols-outlined">
                                              download
                                            </span>
                                          </a>
                                          \`
                                            : "-"
                                        }
                                    </td>\n`;
    } else {
      col = `                                    <td class="p-2 border border-black text-center">
                                          \${data[i].${element.lname}}
                                    </td>\n`;
    }
    result += col;
  }

  return result;
};

const generateTagFields = (
  fields: FormField[],
  showProject: boolean,
  formId: string
): string => {
  let result = `    ${formId}.id ,\n`;
  for (const [index, element] of fields.entries()) {
    if (!showProject && index == fields.length - 1) {
      result += `    ${formId}.${element.lname} \n`;
    } else {
      result += `    ${formId}.${element.lname} ,\n`;
    }
  }
  if (showProject) result += `    form_40.Project \n`;

  return result;
};

export { generateReportHTML, generateReportTAG };
