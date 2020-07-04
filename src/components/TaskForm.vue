<template>
  <v-form v-model="taskForm" ref="taskForm" onsubmit="return false;" @submit="sendForm()">
    <v-text-field
      v-model="task.description"
      :rules="taskRules"
      :label="label"
      placeholder="Descripción"
      append-outer-icon="mdi-send"
      clearable
      @click:append-outer="sendForm()"
    />
    <v-slide-group v-model="task.priority" class="pa-1" style="flex-direction: column;">
      <label class="subtitle-1" style="margin: auto 0;">Prioridad:</label>
      <v-slide-item
        v-for="priority in priorities"
        :key="priority.value"
        v-slot:default="{ active, toggle }"
      >
        <v-chip
          class="mx-1"
          :color="active ? priority.color : 'default'"
          @click="toggle"
        >{{ priority.value }}</v-chip>
      </v-slide-item>
    </v-slide-group>
  </v-form>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    label: {
      type: String,
      default: "Nueva Tarea"
    },
    task: {
      type: Object,
      default: () => {
        return {
          description: "",
          priority: 0,
          state: false,
          user: this.$store.state.user._id
        };
      }
    },
    priorities: {
      type: Array
    }
  },
  data() {
    return {
      taskForm: true,
      taskRules: [
        value => !!value || "Campo requerido",
        value => (value && value.length >= 3) || "Mínimo 3 caracteres"
      ]
    };
  },
  methods: {
    ...mapMutations(["setSnack"]),
    async sendForm() {
      if (this.$refs.taskForm.validate()) {
        // Utilizamos async - await para esperar que se emita el evento antes de resetear el formulario
        await this.$emit("sendForm");
        this.resetForm();
      } else {
        this.setSnack({
          isOpen: true,
          text: "Formulario inválido",
          color: "error"
        });
      }
    },
    resetForm() {
      this.$refs.taskForm.reset();
    }
  }
};
</script>

<style>
</style>