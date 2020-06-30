//import { set, toggle } from '@/utils/vuex'

export default {
  setDrawer (state, payload) {
    state.drawer = payload
  },
  setUser (state, { user, token }) {
    state.user = user
    state.token = token
  },
  clearUser (state) {
    localStorage.clear();
    state.user = null
    state.token = null
  },
  setTasks (state, tasks) {
    state.tasks = tasks
  }
}