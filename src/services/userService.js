import axios from "../axios";

export const postLogin = (email, password) => {
  return axios.post('/api/login', { email, password })

}
