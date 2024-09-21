<script setup lang="ts">
import InfoIcon from "~icons/material-symbols/info-outline-rounded";
import AddIcon from "~icons/material-symbols/add-rounded";
import TrashIcon from "~icons/cil/trash";
import CopyIcon from "~icons/material-symbols/content-copy-outline-rounded";
import TickIcon from "~icons/charm/tick";

import { typeItems } from "~/data/formsData";

import type { FormField } from "~/types/forms/FormData";
import type { ReportData } from "~/types/forms/Report";

const route = useRoute();
const notify = useSnackbarStore();
const report = useReportStore();
const { validationRules: rules } = useValidation();

useHead({
  title: "Build Form",
});

const selectedField = ref<FormField | null>(null);

const formCode = ref({
  reportTag: "",
  reportHTML: "",
});

const step = ref<number>(1);
const fieldsValid = ref(false);
const listValid = ref(false);

const reportData = ref<ReportData>({
  title: "",
  formId: "",
  showProject: false,
  showFields: [
    {
      type: "textbox",
      name: "",
      lname: "",
    },
  ],
});

const addField = () => {
  reportData.value.showFields.push({
    type: "textbox",
    name: "",
    lname: "",
  });
};

const deleteField = (field: FormField) => {
  reportData.value.showFields = reportData.value.showFields.filter(
    (el) => el.lname != field.lname
  );
};

const copiedHTML = ref(false);
const copy = (type: "TAG" | "HTML") => {
  if (type == "HTML") {
    navigator.clipboard.writeText(formCode.value.reportHTML);
    copiedHTML.value = true;
    setTimeout(() => {
      copiedHTML.value = false;
    }, 1500);
  } else if (type == "TAG") {
  }

  notify.showMessage("Copied to clipboard!", "", 1500);
};

const dontRepeat = (v: string): string | boolean => {
  const foundedRepeat = reportData.value.showFields.filter(
    (el) => el.lname == v
  );
  return foundedRepeat.length > 1 ? "نام لاتین نباید تکراری باشد" : true;
};

onMounted(() => {
  if (route.query.preSet && report.fields.length > 0) {
    reportData.value.formId = report.formId;
    reportData.value.title = report.formTitle;
    reportData.value.showFields = report.fields;
  }
});
</script>
<template>
  <v-container class="pa-0">
    <v-stepper
      v-model="step"
      alt-labels
      :items="['انتخاب فیلد ها', 'خروجی']"
      next-text="مرحله بعد"
      prev-text="مرحله قبل"
      :disabled="!fieldsValid"
    >
      <template v-slot:item.1>
        <v-card>
          <v-card-title>
            <v-btn variant="text" icon>
              <v-icon :icon="InfoIcon"></v-icon>
            </v-btn>
            ساخت فرم
          </v-card-title>
          <v-card-text>
            <v-form v-model="fieldsValid" @submit.pervent="null">
              <v-row class="mb-0">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reportData.title"
                    label="نام گزارش"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="reportData.formId"
                    label="ایدی فرم"
                    placeholder="form_{id}"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-checkbox
                    v-model="reportData.showProject"
                    label="نمایش پروژه"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-3">
                <v-col class="text-h5" cols="12"> فیلد ها </v-col>
              </v-row>
              <v-row
                v-for="(field, index) in reportData.showFields"
                :key="index"
              >
                <v-col>
                  <v-select
                    v-model="field.type"
                    :items="typeItems"
                    label="نوع فیلد"
                  >
                  </v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="field.name"
                    label="نام فیلد"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col class="d-flex align-center">
                  <v-text-field
                    v-model="field.lname"
                    label="نام لاتین"
                    :rules="[rules.required, dontRepeat]"
                  >
                  </v-text-field>
                  <v-btn icon variant="text" @click="deleteField(field)">
                    <v-icon :icon="TrashIcon"></v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-divider></v-divider>
                  <v-btn
                    icon
                    class="mx-3"
                    @click="addField"
                    :disabled="!fieldsValid"
                  >
                    <v-icon :icon="AddIcon"></v-icon>
                  </v-btn>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-row>
          <v-col class="text-h5" cols="12"> خروجی </v-col>
          <v-col cols="12">
            <div dir="ltr">
              <v-card class="overflow-hidden">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div>Form HTML</div>
                  <v-btn variant="text" icon @click="copy('HTML')">
                    <v-icon :icon="copiedHTML ? TickIcon : CopyIcon"></v-icon>
                  </v-btn>
                </v-card-title>
                <ClientOnly>
                  <highlightjs
                    language="html"
                    lang="html"
                    :autodetect="false"
                    :code="formCode.reportHTML"
                  />
                </ClientOnly>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12">
            <div dir="ltr">
              <v-card class="overflow-hidden">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div>List Code</div>
                  <v-btn variant="text" icon @click="copy('TAG')">
                    <v-icon :icon="copiedHTML ? TickIcon : CopyIcon"></v-icon>
                  </v-btn>
                </v-card-title>
                <ClientOnly>
                  <highlightjs autodetect :code="formCode.reportTag" />
                </ClientOnly>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-stepper>
  </v-container>
</template>
