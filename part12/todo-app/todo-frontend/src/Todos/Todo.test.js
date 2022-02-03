import { render, screen } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Todo from './Todo';



test('renders content', () => {
    const todo = {
      text: 'this should be visible',
      done: false,
      _id: "617f1cfe95e4293c28a23434",

    }
  
    const component = render(
      <Todo todo={todo}  />
    )
    
    expect(component.container).toHaveTextContent(
        'this should be visible'
      )

  })