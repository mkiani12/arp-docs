<script setup lang="ts">
useHead({
  title: "NodeJS",
});

const firstCode = `router.post(
  "/entrance",
  checkRequirmentsAuthEntrance,
  findUser,
  createToken,
  responseEntrance
);

router.post("/check", checkToken, userExist, responseUserAuthCheck);

router.get("/report", checkToken, userExist, findLogEntrance);

router.post(
  "/access-control",
  checkToken,
  userExist,
  checkAccessControl,
  findUserJob,
  findUserAccesses,
  findSevicesAndPages,
  findUserAccessLevel
);`;

const financialCode = `router.get(
  "/migrate/:year?",
  createListenChannelMethod,
  RunChannelMethod,
  responseChannelIdMethod
);
router.post(
  "/migrate/status",
  checkMigrateProgressRequirments,
  checkStatusOfMigration
);`;

const hseCode = `router.post(
  "/fullReport/:nationalCode?",
  checkRequirmentFullReport,
  checkNationalCode,
  findAllGeneralEducationCourse,
  findAllInitialIncidentReport,
  findAllOrientationCourseDuringWork,
  findAllRecordsOfEmployee,
  findAllSpecializedTrainingOfEmployee,
  prepareFullReport,
  responseFullReport
);
`;

const machinCode = `router.get(
  "/migrate/:year?",
  createListenChannelMethod,
  RunChannelMethod,
  responseChannelIdMethod
);

router.post(
  "/migrate/status",
  checkMigrateProgressRequirments,
  checkStatusOfMigration
);`;

const projectCode = `data.project = "PWA/$ {data.project}";
await updateProjectData(data);
await updatePerformanceData(data);
await changeLastUpdate(data);`;

const reportCode = `router.get(
  "/migrate",
  checkExistSHPDeletedTable,
  createSHPDeletedTable,
  createTableOfLists,
  insertTableOfListData,
  insertSHPDeletedTable,
  updateSHPOptionsTable,
  responseTableOfLists
);

router.get("/updateAllWebs", updateAllWebs);

router.post(
  "/lastUpdate/:project?",
  checkUpdateRequirement,
  findProjectLastUpdateFromPCH
);

router.get(
  "/performanceCache",
  createPerformanceTables,
  insertPerformanceTables,
  convertPerformanceActiveToArchive
);

router.get(
  "/find/:project?",
  checkUpdateRequirement,
  checkProjectExistInCMS,
  findProjectFromWSS
);`;

const sentenceCode = `router.get('/all/:projectId?/:companyId?',findAllSentence,prepareAllSentence,responseSentence)`;
</script>
<template>
  <v-container class="pa-0">
    <v-card class="mb-3">
      <v-card-title>داکیومت BPM Backend</v-card-title>
      <v-card-text
        >این داکیومنت مربوط به کد ها و ابزار های استفاده شده در نرم افزار راهکار
        اتوماسیونی bpm میباشد که به صورت رابط های api کمک به پردازش اطلاعات و
        action های کاستوم در پورتال آریانیک توسعه داده شده. بهتر است برای درک
        بهتر این داکیومنت بر روی Nodejs & Expressjs آشنایی کافی داشته باشید، ما
        در غیر این صورت نیز توان درک کد های مربوطه را با تسط به JS نیز امکان
        پذیر است.
      </v-card-text>
    </v-card>
    <v-card class="mb-3">
      <v-card-title>اعتبار سنجی کاربران</v-card-title>
      <v-card-text>
        نرم افزار بک اند bpm برای بررسی اعتبار سنجی کابران و پاسخ به درخواست های
        ارسالی کلاینت نیاز به اعبار سنجی کاربر از طریق توکن پیش ارسال شده به
        کاربر نیاز دارد.
        <br />
        بهتر است برای توضیحات بر روی فایل های موجود بر روی پروژه بررسی ها انجام
        شود؛ به مسیر
        <span class="font-italic">routes/authRoutes.js</span>
        بروید.
        <br />
        <br />
        <highlightjs dir="ltr" :code="firstCode" language="javascript" />
        <br />
        <br />
        در این قسمت شما چهار اند پوینت مربوط به authentication مشاهده میکنید
        <span class="font-italic">entrance</span> برای لاگین کردن کابران موجود
        در Active Directory میباشد. از سوی دیگر دیگر اند های
        <span class="font-italic">check</span> و
        <span class="font-italic">access-controle</span> برای چک کردن درسترسی ها
        و valid بودن توکن به کار گرفته میشود. اند پوینت
        <span class="font-italic">report</span> نیز گزارشی درباه ورود کاربران به
        سیستم باز میگرداند که دسترسی این اند پوینت برای Admin نرم افزار ممکن
        میباشد. با باز بینی کد ها میتوانید به درک کاملی از عمل کرد این سیستم
        برسید.
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>انتقال دیتا های مالی</v-card-title>
      <v-card-text>
        در این قسمت کافی است به مسیر
        <span class="font-italic">routes/financialRoutes.js</span> بروید. در این
        قسمت دو اند پوینت برای migration اطلاعات مالی موجود میباشد.
        <br />
        <br />
        <highlightjs dir="ltr" :code="financialCode" language="javascript" />
        <br />
        این بخش refactor شده migration این بخش بهتر است مجدد refactor شود زیرا
        سناریو استفاده از rabbitMQ دارای مشکلاتی از جمله استفاده نشدن از
        exchange میباشد، لذا اگر موقعیت زمانی و تخصصی فراهم بود اقدام به تغییرات
        در این بخش از کد ها بکنید.
        <br />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>انتقال دیتا های مالی</v-card-title>
      <v-card-text>
        در این قسمت کافی است به مسیر
        <span class="font-italic">routes/financialRoutes.js</span> بروید. در این
        قسمت دو اند پوینت برای migration اطلاعات مالی موجود میباشد.
        <br />
        <br />
        <highlightjs dir="ltr" :code="financialCode" language="javascript" />
        <br />
        این بخش refactor شده migration این بخش بهتر است مجدد refactor شود زیرا
        سناریو استفاده از rabbitMQ دارای مشکلاتی از جمله استفاده نشدن از
        exchange میباشد، لذا اگر موقعیت زمانی و تخصصی فراهم بود اقدام به تغییرات
        در این بخش از کد ها بکنید.
        <br />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>بخش HSE نرم افزار</v-card-title>
      <v-card-text>
        اند پوینت HSE مربوط به گزارشات موجود در این بخش میباشد، fullReport
        گزارشات HSE با دریافت کد ملی فرد و جمع آوری دیتا با روابط موجود در
        دیتابیس این اماکان را فراهم میسازد. برای بررسی پیشتر میدلور ها
        (functions) استفاده شده درون اندپوینت را دنبال کنید و بلاک کد های نرم
        افزار را مطالعه کرده،بیشتر نامگذاری ها به شکل مفهومی بوده و مشکلی در درک
        آن نخواهید داشت.
        <highlightjs dir="ltr" :code="hseCode" language="javascript" />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>ماشین آلات</v-card-title>
      <v-card-text>
        به طور بسیار مشابهی همانند اند پوینت های مالی کار میکند، کافیست class
        مربوط به دیتا های مالی financial را در فولدر
        <span class="font-italic">class/financialClass.js</span> مطالعه کنید؛
        چونکه دیتا های ماشین آلات نیز از طریق همین class اجرا و در دیتابیس
        آریانیک ذخیره میشوند. تفاوت فقط در ارسال پارامتر ها در constructor کلاس
        مالی میباشد، زیرا با این تغییر دیتا ها به بر روی table و database دیگری
        switch میشوند.
        <highlightjs dir="ltr" :code="machinCode" language="javascript" />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>انتقال دیتا های مدیریت پروژه</v-card-title>
      <v-card-text>
        کد های موجود در پایین این پاراگراف مربوط به بخش کوچکی از ماگرین دیتا های
        پروژه ها میباشد که به کد پروژه دیتا های آن پروژه را یافته و در دیتابیس
        آریانیک انتفال میدهد. بیشتر کد های این بخش متد ها و قابلیت های RabbitMQ
        در آمیخته شده است. بهتر است قبل از Dive در این موضوع کمی مفاهیم message
        broker ها را مطالعه کنید. این بخش نیز نیاز به refactor دارد.
        <highlightjs dir="ltr" :code="projectCode" language="javascript" />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>گزارش گیری های پروژه</v-card-title>
      <v-card-text>
        بجز انتقال اطلاعات ما نیاز به بازگرداندن اطلاعات پروژه به کاربران داریم،
        در فایل
        <span class="font-italic">routes/reportRoutes.js</span> میتوانید اند
        پوینت های مربوط به گزارشات پروژه ها را مشاهده کنید. این اطلاعات از قبیل
        آخرین زمان آپدیت پروژه و دریافت کامل اطلاعات با کد یکتا پروژه
        همچنینآپدیت تمامی پروژه ها و بروزرسانی اطلاعات میباشد.
        <highlightjs dir="ltr" :code="reportCode" language="javascript" />
      </v-card-text>
    </v-card>

    <v-card class="mb-3">
      <v-card-title>گزارش و جکع آوری قرارداد ها</v-card-title>
      <v-card-text>
        برای دریافت قرارداد های مختلف فرد و سنوات شغلی مربوطه اندپوینت گزارش
        گیری در فایل
        <span class="font-italic">routes/sentenceRoute.js</span> توسعه داده شده
        است. این اندپوینت نیز مانند تمام گزارشات فردی با کد ملی فرد دیتا های
        مورد نیاز را استخراج و تنظیم برای پاسخ به کلاینت میکند.
        <highlightjs dir="ltr" :code="sentenceCode" language="javascript" />
      </v-card-text>
    </v-card>
  </v-container>
</template>
