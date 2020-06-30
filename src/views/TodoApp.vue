<template>
  <v-container class="todo-container">
    <v-card>
      <v-tabs v-model="tab" centered icons-and-text>
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#my-tasks">
          Mis Tareas
          <v-icon>mdi-account</v-icon>
        </v-tab>

        <v-tab href="#users">
          Usuarios
          <v-icon>mdi-account-multiple</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="my-tasks">
          <Tasks />
        </v-tab-item>
        <v-tab-item value="users">
          <Users />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null
    };
  },
  methods: {}
};
</script>

<style>
.todo-container {
  padding: 64px;
}

@media (max-width: 768px) {
  .todo-container {
    padding: 16px;
  }
}
</style>