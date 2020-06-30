<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="3">
        <v-card class="elevation-12 text-center">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
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
            <v-btn color="primary" style="margin: auto" @click="login()">Ingresar</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from "axios";

export default {
  data() {
    return {
      credenciales: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      axios
        .post("/login", this.credenciales)
        .then(response => {
          let user = JSON.stringify(response.data.user);
          localStorage.setItem("user", user);
          localStorage.setItem("token", response.data.token);
          this.setUser(response.data)
          this.$router.push("/todo");
        })
        .catch(error => {
          console.log(error.response.data.error);
        });
    }
  }
};
</script>