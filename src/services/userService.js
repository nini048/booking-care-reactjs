import axios from "../axios";
export const postLogin = (email, password) => {
  return axios.post('/api/login', { email, password })

}
export const getAllUsers = (id) => {
  return axios.get(`api/get-all-users?id=${id}`)
}
export const postNewuser = (user) => {
  return axios.post('api/create-new-user', user)
}
export const deleteUser = (id) => {
  return axios.delete(`/api/delete-user/${id}`)
}
export const putEditUser = (id, data) => {
  return axios.put(`/api/edit-user/${id}`, data)
}
export const getAllCodeService = (inputType) => {

  return axios.get(`/allcode?type=${inputType}`)
}
export const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data)
}
