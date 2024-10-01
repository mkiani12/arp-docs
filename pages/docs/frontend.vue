<script setup lang="ts">
import { globalTagsCode } from "~/data/frontend";

useHead({
  title: "NodeJS",
});
</script>
<template>
  <v-container class="pa-0">
    <v-card class="mb-3">
      <v-card-title>مستندات آریانیک</v-card-title>
      <v-card-text>
        این داکیومنت مربوط به کد ها و ابزار های استفاده شده در نرم افزار آریانیک
        که شامل کتابخانه های استفاده شده ، بخش هایی از قالب ، و ابزار های آماده
        شده در قالب میباشد که برای آسانتر کردن توسعه پورتال سازمانی پیاده سازی
        شده است میباشد.
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>کتابخانه های استفاده شده و ابزار ها</v-card-title>
      <v-card-text>
        تمامی کتابخانه های استفاده شده به صورت فایل هایی میباشند که در مسیر
        <b dir="ltr font-italic">"\Aryanic\www\includes\siteassets"</b>
        داخل پوشه آریانیک روی سرور قرار گرفته اند
        <br />
        برای استفاده از این فایل ها داخل پورتال تمامی تگ های مربوط به فراخوانی
        آنها در یک قطعه کد داخل کنترل پنل آریانیک به مسیر
        <b dir="ltr font-italic">
          "قالب و رنگ بندی / مدیریت کد ها / تگ های Global"
        </b>
        قرار گرفته است
        <br />
        <br />
        <highlightjs dir="ltr" :code="globalTagsCode" language="javascript" />
        <br />
        <br />
        لیست کتابخانه های استفاده شده
        <div dir="ltr">
          CSS Libraries:
          <ol class="pl-8">
            <li>flowbite.min.css</li>
            <li>font.css</li>
            <li>leaflet.css</li>
            <li>tabulator.min.css</li>
            <li>persian-datepicker.min.css</li>
            <li>pdf_viewer.min.css</li>
          </ol>

          Javascript Libraries:
          <ol class="pl-8">
            <li>flowbite.min.js</li>
            <li>tailwind.js</li>
            <li>vue.global.js</li>
            <li>axios.js</li>
            <li>apexcharts.js</li>
            <li>chart.js</li>
            <li>chartjs-plugin-datalabels@2.0.0.js</li>
            <li>shim.min.js</li>
            <li>xlsx.full.min.js</li>
            <li>moment.min.js</li>
            <li>jalali-moment.browser.js</li>
            <li>chartjs-adapter-moment.js</li>
            <li>leaflet.js</li>
            <li>tabulator.min.js</li>
            <li>org2.js</li>
            <li>persian-date.min.js</li>
            <li>pdf.min.mjs</li>
            <li>FileSaver.js</li>
          </ol>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
