// import axios from 'axios'

// export const API = axios.create({
//   baseURL: 'https://jeffdeng-memories-app.herokuapp.com',
// })
import API from './axios-instance'

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const fetchPosts = () => API.get('/posts')

export const createPost = newPost => API.post('/posts', newPost)

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)

export const deletePost = id => API.delete(`/posts/${id}`)

export const likePost = id => API.patch(`/posts/${id}/likePost`)

export const signIn = formData => API.post('/user/signin', formData)
export const signUp = formData => API.post('/user/signup', formData)
