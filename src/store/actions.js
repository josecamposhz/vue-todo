import axios from 'axios'

export default {
  async getUserTasks({ commit, state }) {
    return await axios.get(`tasks/users/${state.user._id}`).then(response => {
      // Guardamos la respuesta en la constante tasks
      const tasks = response.data;
      // Lo seteamos con el mutation "setTasks"
      commit('setTasks', tasks)
    })
  }
}