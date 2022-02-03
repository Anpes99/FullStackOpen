import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (title, author, url, token) => {
  console.log(token, '   ', title)
  const res = await axios.post(baseUrl, { title:title, author:author, url:url }, { headers: { 'Authorization': token }, })
  return res.data
}

const updateBlog = async (id, patch) => {
  console.log(id)
  const res = await axios.patch(`api/blogs/${id}`,patch)
  return res.data
}

const deleteBlog = async (id, token) => {
  console.log('dele')
  const res = await axios.delete(`api/blogs/${id}`,  { headers: { 'Authorization': token } })
  console.log('responese')
  return res.data
}

export default { getAll, createBlog, updateBlog,deleteBlog }