<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    persistent
    mobile-breakpoint="991"
    width="260"
  >
    <v-list class="py-0">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img :src="user.picture" />
        </v-list-item-avatar>
        <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
        active-class="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "/" },
      { title: "Vuex", icon: "mdi-file-document", route: "/docs" },
      { title: "Código", icon: "mdi-code-tags", route: "/code" }
    ]
  }),
  computed: {
    ...mapState(["user"]),
    inputValue: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val)
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    ...mapMutations(['setDrawer']),
    ...mapActions(['getUser'])
  }
};
</script>
