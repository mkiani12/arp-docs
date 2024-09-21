<script setup lang="ts"></script>

<template>
  <v-locale-provider rtl>
    <v-app>
      <LayoutFullMain />
      <v-main class="mr-md-5 mx-2 mx-md-0">
        <v-container fluid class="page-wrapper">
          <div class="maxWidth">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
