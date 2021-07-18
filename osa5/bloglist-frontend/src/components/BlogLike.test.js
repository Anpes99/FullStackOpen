import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

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



test('when like button is pressed twice eventhandler is called twice', () => {
  const handleLikeMock = jest.fn()
  const component = render(
    <Blog key={blog.id} blog={blog} user={user} handleLike={handleLikeMock} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  console.log(handleLikeMock.mock.calls)
  expect(handleLikeMock.mock.calls).toHaveLength(2)

})