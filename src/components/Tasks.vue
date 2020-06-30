<template>
  <v-card flat class="px-6">
    <v-card-text>
      <task-form :task="task" :priorities="priorities" @sendForm="addTask()" />

      <v-hover v-slot:default="{ hover }" v-for="(item, key) in tasks" :key="key">
        <v-card :elevation="hover ? 6 : 2" class="my-4">
          <v-card-text>
            <v-chip
              :color="getPriority(item.priority, false)"
            >{{ getPriority(item.priority, true) }}</v-chip>
            <v-spacer />

            <task-form
              v-if="currentTask._id === item._id"
              :task="currentTask"
              :priorities="priorities"
              label="Editar Tarea"
              @sendForm="updateTask()"
            />

            <v-row class="px-4" align="center" v-else>
              <v-checkbox v-model="item.state" @change="updateTaskState(item)" />
              <span
                :class="`pointer ml-2 ${item.state ? 'text-decoration-line-through' : ''}`"
                @click="editTask(item)"
              >{{ item.description }}</span>
              <v-spacer />
              <div>
                <v-btn fab icon color="info" @click="editTask(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn fab icon color="error" @click="deleteTask(item._id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-hover>
      <h1 class="text-center m-auto pa-6" v-if="tasksCounter === 0">No tienes tareas</h1>
    </v-card-text>
    <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color" bottom>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn dark icon v-bind="attrs" @click="snackbar.isOpen = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      task: {
        description: "",
        priority: 0,
        state: false,
        user: this.$store.state.user._id
      },
      currentTask: {
        description: "",
        priority: 0,
        state: false,
        user: this.$store.state.user._id
      },
      priorities: [
        { id: 0, value: "Normal", color: "success" },
        { id: 1, value: "Urgente", color: "warning" },
        { id: 2, value: "Muy urgente", color: "error" }
      ],
      snackbar: {
        isOpen: false,
        text: "",
        color: "success"
      }
    };
  },
  computed: {
    ...mapState(["user", "tasks"]),
    ...mapGetters(["tasksCounter"])
  },
  mounted() {
    this.getUserTasks();
  },
  methods: {
    ...mapActions(["getUserTasks"]),
    addTask() {
      axios
        .post("tasks", this.task)
        .then(response => {
          this.getUserTasks();
          this.openSnack(response.data, "success");
        })
        .catch(error => {
          this.openSnack(error.response.data.error, "error");
        });
    },
    editTask(task) {
      this.currentTask = task;
    },
    updateTask() {
      axios
        .put(`tasks/${this.currentTask._id}`, this.currentTask)
        .then(response => {
          this.currentTask = response.data;
          this.currentTask._id = 0;
          this.openSnack("Cambios guardados", "success");
        })
        .catch(error => {
          this.openSnack(error.response.data.error, "error");
        });
    },
    updateTaskState(task) {
      axios.put(`tasks/${task._id}`, task).catch(error => {
        this.openSnack(error.response.data.error, "error");
      });
    },
    deleteTask(id) {
      axios.delete(`tasks/${id}`).then(() => {
        this.getUserTasks();
        this.openSnack("Tarea eliminada con exito", "success");
      });
    },
    getPriority(id, returnValue) {
      const priority = this.priorities.find(priority => priority.id == id);
      if (returnValue) return priority.value;
      return priority.color;
    },
    openSnack(text, color) {
      this.snackbar.isOpen = true;
      this.snackbar.text = text;
      this.snackbar.color = color;
    }
  }
};
</script>