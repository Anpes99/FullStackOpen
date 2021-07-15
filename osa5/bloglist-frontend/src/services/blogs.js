import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (title, author, url, token) => {
  console.log(token, "   ", title)
  const res = await axios.post(baseUrl, {title:title, author:author, url:url}, {headers: {'Authorization': token},})
  return res.data
}

export default { getAll, createBlog }