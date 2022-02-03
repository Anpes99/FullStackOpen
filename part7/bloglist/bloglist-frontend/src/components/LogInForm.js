import React from 'react'
import { TextField, Button } from '@material-ui/core'
const LoginInForm = (props) => (



  <div>
    <h2>Log in to application</h2>
    <form onSubmit={props.handleLogin}>
      <div>

        <TextField
          label='username'
          id='username'
          type="text"
          value={props.username}
          name="Username"
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>

        <TextField
          label='password'
          id='password'
          type="password"
          value={props.password}
          name="Password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <Button  variant='contained' id='logInFormSubmit' type="submit">login</Button>
    </form>
  </div>
)

export default LoginInForm