<script setup lang="ts">
/*Call Components*/
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <DashboardLinkCards />
        </v-col>
        <!-- Sales overview -->
        <v-col cols="12" lg="8"> <DashboardProcess /> </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="4"><DashboardRequests /> </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
