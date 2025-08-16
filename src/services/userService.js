import axios from "../axios";
export const postLogin = (email, password) => {
  return axios.post('/api/login', { email, password })

}
export const getAllUsers = (id) => {
  return axios.get(`api/get-all-users?id=${id}`)
}
