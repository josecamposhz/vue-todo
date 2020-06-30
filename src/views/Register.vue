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
      }
    };
  },
  methods: {
    crearUsuario() {
      axios
        .post("/register", this.user)
        .then(() => {
          alert("Usuario creado con exito!");
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(error.response.data.error);
        });
    },
    clearForm() {
      this.user = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      };
    }
  }
};
</script>

<style>
</style>