<script lang="ts" setup>
definePageMeta({
  layout: "blank",
  auth: false,
});
const route = useRoute();
const router = useRouter();
const token = route.query.token;
const { status } = useAuth();
console.log(status);
if (status.value == "unauthenticated") {
  if (token) {
    // router.push("/");
  }
} else {
}
</script>
<template>
  <div class="h-100 w-100 d-flex justify-center align-center">
    <div class="text-center">
      درحال انتقال...
      <br />
      <br />
      <v-progress-circular indeterminate class="mx-auto" />
    </div>
  </div>
</template>
