export default {
  drawer: null,
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
  tasks: [],
  snackbar: {
    isOpen: false,
    text: "",
    color: "success"
  }
}
