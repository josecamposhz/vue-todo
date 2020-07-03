<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6" md="3">
        <v-card class="elevation-12 text-center">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registro</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="user.first_name"
                placeholder="Nombre"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="user.last_name"
                placeholder="Apellidos"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                v-model="user.email"
                placeholder="Correo"
                prepend-icon="mdi-email"
                type="text"
              />
              <v-text-field
                v-model="user.password"
                placeholder="Contraseña"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
            <v-btn class="m-auto mr-1" @click="clearForm()">Limpiar</v-btn>
            <v-btn color="success" class="m-auto ml-1" @click="crearUsuario()">Registro</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color" bottom>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark icon v-bind="attrs" @click="snackbar.isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
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
    crearUsuario() {
      axios
        .post("/register", this.user)
        .then(() => {
          this.openSnack("Usuario creado con exito", "success");
          this.$router.push("/login");
        })
        .catch(error => {
          this.openSnack(error.response.data.error, "error");
        });
    },
    clearForm() {
      this.user = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      };
    },
    openSnack(text, color) {
      this.snackbar.isOpen = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    }
  }
};
</script>

<style>
</style>