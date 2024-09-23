<script setup lang="ts">
import InfoIcon from "~icons/material-symbols/info-outline-rounded";
import AddIcon from "~icons/material-symbols/add-rounded";
import OptionsIcon from "~icons/cil/options";
import CopyIcon from "~icons/material-symbols/content-copy-outline-rounded";
import TickIcon from "~icons/charm/tick";

import {
  typeItems,
  generateFormJS,
  generateFormHTML,
  generateFormLIST,
} from "~/data/formsData";
import type { FormField, FormData } from "~/types/forms/FormData";

const notify = useSnackbarStore();
const report = useReportStore();
const { validationRules: rules } = useValidation();
const router = useRouter();

useHead({
  title: "Build Form",
});

const selectedField = ref<FormField | null>(null);

const formCode = ref({
  formJS: computed(() =>
    generateFormJS(form.value.id, form.value.listPage, form.value.fields)
  ),
  formHTML: computed(() =>
    generateFormHTML(
      form.value.title,
      form.value.fieldPerRow,
      form.value.fields
    )
  ),
  formLIST: computed(() =>
    generateFormLIST(
      form.value.id,
      form.value.page,
      form.value.listShowProject,
      form.value
    )
  ),
});

const step = ref<number>(1);
const fieldsValid = ref(false);
const listValid = ref(false);

const stepperDisabled = computed(() => {
  return (
    (step.value == 1 && !fieldsValid.value) ||
    (step.value == 2 &&
      (form.value.selectedListFields.length < 1 || !listValid.value))
  );
});
const form = ref<FormData>({
  title: "",
  id: "",
  page: "",
  listPage: "",
  fields: [
    {
      type: "textbox",
      name: "",
      lname: "",
    },
  ],
  fieldPerRow: 3,
  selectedListFields: [],
  listShowProject: false,
});

const addField = () => {
  form.value.fields.push({
    type: "textbox",
    name: "",
    lname: "",
  });
};

const optionsDialog = ref(false);
const openOptions = (field: any) => {
  // field.name += "++";
};

const changeListNameDialog = ref(false);
const editListName = (field: FormField) => {
  console.log(field);
};

const copiedJS = ref(false);
const copiedHTML = ref(false);
const copiedLIST = ref(false);
const copy = (type: "JS" | "HTML" | "LIST") => {
  navigator.clipboard.writeText(formCode.value[`form${type}`]);
  eval(`copied${type}`).value = true;
  setTimeout(() => {
    eval(`copied${type}`).value = false;
  }, 1500);

  notify.showMessage("Copied to clipboard!", "", 1500);
};

const dontRepeat = (v: string): string | boolean => {
  const foundedRepeat = form.value.fields.filter((el) => el.lname == v);
  return foundedRepeat.length > 1 ? "نام لاتین نباید تکراری باشد" : true;
};

const goToReportPage = () => {
  report.setFields(form.value.fields, form.value.id, form.value.title);
  router.push("/build/report?preSet=true");
};
</script>
<template>
  <v-container class="pa-0">
    <v-dialog v-model="optionsDialog">
      <v-card></v-card>
    </v-dialog>
    <v-dialog v-model="changeListNameDialog">
      <v-card></v-card>
    </v-dialog>
    <v-stepper
      v-model="step"
      alt-labels
      :items="['ساخت فرم', 'ساخت لیست', 'خروجی']"
      next-text="مرحله بعد"
      prev-text="مرحله قبل"
      :disabled="stepperDisabled"
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
                    v-model="form.title"
                    label="نام فرم"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.id"
                    label="ایدی فرم"
                    placeholder="form_{id}"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="form.page"
                    label="صفحه فرم"
                    placeholder="***"
                    :rules="[rules.required]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-slider
                    v-model="form.fieldPerRow"
                    label="تعداد فیلد در ردیف"
                    :min="1"
                    :max="4"
                    :ticks="[1, 2, 3, 4]"
                    show-ticks="always"
                    step="1"
                    tick-size="4"
                  ></v-slider>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-3">
                <v-col class="text-h5" cols="12"> فیلد ها </v-col>
              </v-row>
              <v-row v-for="(field, index) in form.fields" :key="index">
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
                  <v-btn icon variant="text" @click="openOptions(field)">
                    <v-icon :icon="OptionsIcon"></v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-divider></v-divider>
                  <v-btn icon class="mx-3" @click="addField">
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
        <v-card>
          <v-card-title>
            <v-btn variant="text" icon>
              <v-icon :icon="InfoIcon"></v-icon>
            </v-btn>
            ساخت لیست
          </v-card-title>
          <v-card-text>
            <v-form v-model="listValid">
              <v-row class="mb-0">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="form.listPage"
                    label="لینک لیست"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="form.listShowProject"
                    label="نمایش پروژه"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-form>
            <v-row class="mt-2">
              <v-col cols="12" md="6">
                <h6 class="text-h6">انتخاب فیلد های نمایشی</h6>

                <v-item-group v-model="form.selectedListFields" multiple>
                  <v-list>
                    <v-item
                      v-for="field in form.fields"
                      :key="field.lname"
                      :value="field.lname"
                      v-slot="{ toggle }"
                    >
                      <v-list-item>
                        <template v-slot:prepend>
                          <v-list-item-action start>
                            <v-checkbox-btn @change="toggle"></v-checkbox-btn>
                          </v-list-item-action>
                        </template>

                        <v-list-item-title>
                          {{ field.listName || field.name }}
                        </v-list-item-title>

                        <template v-slot:append>
                          <v-btn
                            variant="text"
                            icon
                            @click.stop="editListName(field)"
                          >
                            <v-icon> mdi-pen </v-icon>
                          </v-btn>
                        </template>
                      </v-list-item>
                    </v-item>
                  </v-list>
                </v-item-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-row>
          <v-col class="text-h5" cols="12"> خروجی </v-col>

          <v-col cols="12">
            <v-btn @click="goToReportPage">ساخت گزارش</v-btn>
          </v-col>

          <v-col cols="12">
            <div dir="ltr">
              <v-card class="overflow-hidden">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div>Form JS</div>
                  <v-btn variant="text" icon @click="copy('JS')">
                    <v-icon :icon="copiedJS ? TickIcon : CopyIcon"></v-icon>
                  </v-btn>
                </v-card-title>
                <ClientOnly>
                  <highlightjs autodetect :code="formCode.formJS" />
                </ClientOnly>
              </v-card>
            </div>
          </v-col>
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
                    :code="formCode.formHTML"
                  />
                </ClientOnly>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="form.listShowProject"
              label="نمایش پروژه"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <div dir="ltr">
              <v-card class="overflow-hidden">
                <v-card-title class="d-flex justify-space-between align-center">
                  <div>List Code</div>
                  <v-btn variant="text" icon @click="copy('LIST')">
                    <v-icon :icon="copiedLIST ? TickIcon : CopyIcon"></v-icon>
                  </v-btn>
                </v-card-title>
                <ClientOnly>
                  <highlightjs autodetect :code="formCode.formLIST" />
                </ClientOnly>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn @click="goToReportPage">ساخت گزارش</v-btn>
          </v-col>
        </v-row>
      </template>
    </v-stepper>
  </v-container>
</template>
