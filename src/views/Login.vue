<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="3">
        <v-card class="elevation-12 text-center">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="loginForm" ref="loginForm" onsubmit="return false;" @submit="login()">
              <v-text-field
                v-model="credenciales.email"
                placeholder="Correo"
                prepend-icon="mdi-email"
                type="email"
              />
              <v-text-field
                v-model="credenciales.password"
                placeholder="Contraseña"
                prepend-icon="mdi-lock"
                type="password"
              />
              <v-btn color="primary" style="margin: auto" type="submit">Ingresar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color" bottom>
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn dark icon v-bind="attrs" @click="snackbar.isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      loginForm: true,
      credenciales: {
        email: "",
        password: ""
      },
      snackbar: {
        isOpen: false,
        text: "",
        color: "success"
      }
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    ...mapActions(["getUserTasks"]),
    login() {
      axios
        .post("/login", this.credenciales)
        .then(response => {
          this.setUser(response.data);
          let user = JSON.stringify(response.data.user);
          localStorage.setItem("user", user);
          localStorage.setItem("token", response.data.token);
          this.$router.push("/todo");
          this.openSnack(
            `Bienvenido ${user.first_name} ${user.last_name}`,
            "success"
          );
        })
        .catch(error => {
          this.openSnack(error.response.data.error, "error");
        });
    },
    openSnack(text, color) {
      this.snackbar.isOpen = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    }
  }
};
</script>