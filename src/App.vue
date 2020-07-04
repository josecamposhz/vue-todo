<template>
  <v-app>
    <core-navbar />

    <v-main>
      <router-view />
    </v-main>

    <snackbar />
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>

<style>
.v-application code {
  color: #f8f8f2 !important;
  background: 0 0 !important;
  background-color: initial !important;
  font-size: 1em !important;
  font-weight: normal !important;
}
.v-btn {
  margin-top: 2px;
  margin-bottom: 2px;
}

.m-auto {
  margin: auto;
}

@media (max-width: 768px) {
  .hidden-sm-down {
    display: none !important;
  }
}

@media (min-width: 769px) {
  .hidden-sm-up {
    display: none !important;
  }
}

.text-white {
  color: #fff!important;
}

.pointer {
  cursor: pointer;
}
</style>