import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

const handleLike = (blog) => {
  const id = blog.id
  const updatedLikes=blog.likes+1
  blogService.updateBlog(id, { likes:updatedLikes })

}

const blog = {
  title: 'testTitle',
  author: 'testAuthor',
  url: 'testUrl',
  likes: 43,
  id: '60f2b90a76382b4bc4de1314',
  user: {
    _id: '60ede9667386b311441dddc1',
    username: 'username4',
    name: 'name2'
  },
  __v: 0
}

const user = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lNCIsImlkIjoiNjBlZGU5NjY3Mzg2YjMxMTQ0MWRkZGMxIiwiaWF0IjoxNjI2MzU1Mzc3fQ.ijL7618aJCD-Du16dHTC6ilQ5tIO-RFsjad0IEoGZ6A',
  username: 'username4',
  name: 'name2'
}



let component=null
beforeEach(() => {
  component = render(
    <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike}/>
  )})

test('only title and author is show at the beginning', () => {
  const innerDiv = component.container.querySelector('.moreInfoToggled')

  expect(innerDiv).toHaveTextContent('testUrl')
  expect(innerDiv).toHaveTextContent(blog.likes)
  expect(innerDiv).not.toHaveTextContent('testAuthor')
  expect(innerDiv).not.toHaveTextContent('testTitle')
  expect(innerDiv).toHaveStyle('display: none')
  expect(component.container).toHaveTextContent('testAuthor')
  expect(component.container).toHaveTextContent('testTitle')
})

test('url and likes will be visible after clicking view button', () => {
  const innerDiv = component.container.querySelector('.moreInfoToggled')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(innerDiv).not.toHaveStyle('display: none')
})


