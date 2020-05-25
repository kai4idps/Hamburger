import axios from "axios"

const instance = axios.create({
  baseURL: "https://hamburger-75e31.firebaseio.com/",
})

export default instance
