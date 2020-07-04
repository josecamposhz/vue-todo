import axios from 'axios'

export default {
  setDrawer(state, payload) {
    state.drawer = payload
  },
  setUser(state, { user, token }) {
    state.user = user
    state.token = token
    // Actualizamos nuestro header para poder ingresar a las rutas que requieren estar logeado
    axios.defaults.headers.common['Authorization'] = token;
  },
  clearUser(state) {
    localStorage.clear();
    state.user = null
    state.token = null
  },
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setSnack(state, payload) {
    state.snackbar.isOpen = payload.isOpen;
    state.snackbar.text = payload.text;
    state.snackbar.color = payload.color;
  }
}