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
  return axios.put(`/api/edit-user/${id}`, data,)
}
export const getAllCodeService = (inputType) => {

  return axios.get(`/allcode?type=${inputType}`)
}
export const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data, {
    headers: { "Content-Type": "multipart/form-data" }
  })
}
export const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
export const getAllDoctors = () => {
  return axios.get('api/get-all-doctors')
}
export const postInfoDoctor = (data) => {
  return axios.post('api/post-info-doctor', data)
}
export const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-info-doctor?id=${id}`)
}

export const postScheduleDoc = (data) => {
  return axios.post('/api/post-schedule-doctor', data);
};
export const getDoctorSchedule = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
export const postBooking = (data) => {
  return axios.post('/api/book-appointment', data)
}
export const postNewSpecialty = (data) => {
  return axios.post('/api/post-new-specialty', data,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  )
}
export const getAllSpecialty = () => {
  return axios.get('/api/get-all-specialty')
}
