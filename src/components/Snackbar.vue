<template>
  <v-snackbar v-model="snackbar.isOpen" :color="snackbar.color" bottom>
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn dark icon v-bind="attrs" @click="snackbar.isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["snackbar"])
    }
}
</script>