<template>
  <v-app-bar app color="primary" dark>
    <router-link to="/" class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <h1 class="navbar-title fw-light text-white">To Do App</h1>
    </router-link>

    <v-spacer />

    <v-chip v-if="isLogin" class="mx-2" color="green" text-color="white">
      <v-avatar left class="green darken-4">{{ tasksCounter }}</v-avatar>
      <span class="m-auto">TO DO</span>
    </v-chip>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <span class="hidden-sm-down">GitHub</span>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn
            text
            href="https://github.com/JoseCamposhz/nodejs-todo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>nodejs-todo</span>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            text
            href="https://github.com/JoseCamposhz/vue-todo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>vue-todo</span>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn v-if="!isLogin" to="/login" text>
      <span class="hidden-sm-down">Iniciar Sesión</span>
      <v-icon class="hidden-sm-up">mdi-login-variant</v-icon>
    </v-btn>
    <v-btn v-if="!isLogin" to="/register" text>
      <span class="hidden-sm-down">Registro</span>
      <v-icon class="hidden-sm-up">mdi-account-plus</v-icon>
    </v-btn>
    <v-btn v-if="isLogin" text @click="logout()">
      <span class="hidden-sm-down">Cerrar Sesión</span>
      <v-icon class="hidden-sm-up">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["user", "token"]),
    ...mapGetters(["isLogin", "tasksCounter"])
  },
  methods: {
    ...mapMutations(["clearUser"]),
    logout() {
      this.clearUser();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.fw-light {
  font-weight: 400;
}

.text-white {
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-title {
    font-size: 1.5em !important;
    line-height: 0.75em !important;
  }
}
</style>