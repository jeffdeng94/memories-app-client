import axios from 'axios'
const API = axios.create({
  baseURL: 'https://jeffdeng-memories-app.herokuapp.com',
})

// const API = axios.create({
//   baseURL: 'http://localhost:5000/',
// })

export default API
