import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './NewBlogForm'

test('<BlogForm /> calls eventhandler with correct input', () => {
  const handleCreateBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={handleCreateBlog} />
  )

  const form = component.container.querySelector('form')

  fireEvent.change(component.container.querySelector('#title'), {
    target: { value: 'testTitle' }
  })
  fireEvent.change(component.container.querySelector('#author'), {
    target: { value: 'testAuthor' }
  })
  fireEvent.change(component.container.querySelector('#url'), {
    target: { value: 'testUrl' }
  })
  fireEvent.submit(form)

  expect(handleCreateBlog.mock.calls).toHaveLength(1)
  expect(handleCreateBlog.mock.calls[0][1]).toBe('testTitle' )
  expect(handleCreateBlog.mock.calls[0][2]).toBe('testAuthor' )
  expect(handleCreateBlog.mock.calls[0][3]).toBe('testUrl' )
})