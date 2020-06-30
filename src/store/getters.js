export default {
    isLogin (state) {
        if (state.token != null) return true
        return false
    },
    tasksCounter (state) {
        return state.tasks.length
    }
}
