import axios from "axios"

const API = axios.create({
baseURL:"http://127.0.0.1:8000"
})

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token")

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const signup = (data) =>
API.post("/signup/",data)

export const login = (data) =>
API.post("/login/",data)



export const getTasks = () =>
API.get("/tasks/")

export const getTask = (id) =>
API.get(`/tasks/${id}`)

export const createTask = (data) =>
API.post("/tasks/",data)



export const getComments = (taskId) =>
API.get(`/comments/tasks/${taskId}`)

export const addComment = (taskId,data) =>
API.post(`/comments/tasks/${taskId}`,data)

export const updateComment = (commentId,data) =>
API.put(`/comments/${commentId}`,data)

export const deleteComment = (commentId) =>
API.delete(`/comments/${commentId}`)



export const uploadFiles = (taskId, files) => {

const formData = new FormData()

for(let i=0;i<files.length;i++){
formData.append("files", files[i])
}

return API.post(`/files/upload/${taskId}`,formData,{
headers:{
"Content-Type":"multipart/form-data"
}
})

}

export const getFiles = (taskId) =>
API.get(`/files/task/${taskId}`)

export const downloadFile = (fileId) =>
API.get(`/files/download/${fileId}`,{
responseType:"blob"
})

export const deleteFile = (fileId) =>
API.delete(`/files/${fileId}`)



export const getTaskStatus = () =>
API.get("/analytics/status")

export const getTaskOverview = () =>
API.get("/analytics/task-overview")

export const getUserPerformance = () =>
API.get("/analytics/user-performance")

export const getTaskTrends = () =>
API.get("/analytics/task-trends")

export const exportTasks = () =>
API.get("/analytics/export",{
responseType:"blob"
})



export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export default API


// import axios from "axios"

// const API = axios.create({
// baseURL:"http://127.0.0.1:8000"
// })

// export const signup = (data) => API.post("/signup/",data)

// export const login = (data) => API.post("/login/",data)

// export const getTasks = () => API.get("/tasks/")

// export const getTask = (id) => API.get(`/tasks/${id}`)

// export const createTask = (data) => API.post("/tasks/",data)

// export const getComments = (taskId) =>
// API.get(`/comments/tasks/${taskId}`)

// export const addComment = (taskId,data) =>
// API.post(`/comments/tasks/${taskId}`,data)

// export const getAnalytics = () =>
// API.get("/analytics/task-overview")

// export const uploadFiles = (taskId, files) => {

// const formData = new FormData()

// for(let i = 0; i < files.length; i++){
// formData.append("files", files[i])
// }

// return API.post(`/files/upload/${taskId}`, formData, {
// headers: {
// "Content-Type": "multipart/form-data"
// }
// })

// }

// export const getFiles = (taskId) =>
// API.get(`/files/task/${taskId}`)

// export const downloadFile = (fileId) =>
// API.get(`/files/${fileId}`,{
// responseType:"blob"
// })

// export const deleteFile = (fileId) =>
// API.delete(`/files/${fileId}`)

// export default API