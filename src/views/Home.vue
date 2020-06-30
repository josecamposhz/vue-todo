<template>
  <v-row id="home-container" align="center" justify="center">
    <v-col class="text-center m-auto" cols="12">
      <h1 class="display-1 font-weight-thin mb-4">To Do App</h1>
      <v-img src="todo.png" max-width="450" class="m-auto"></v-img>
      <v-btn v-if="!isLogin" class="mt-4 primary" to="/login">
        <span>Iniciar Sesión</span>
        <v-icon class="ml-2">mdi-login-variant</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isLogin"])
  }
};
</script>

<style>
#home-container {
  background-color: #f0f0ff;
  height: 100%;
}
</style>