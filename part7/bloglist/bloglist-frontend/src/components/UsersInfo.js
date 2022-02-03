import { Link } from 'react-router-dom'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@material-ui/core'


const UsersInfo = ({ users }) => {

  console.log(users)
  return(
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{
            users.map(user =>
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/users/${user.id}`} >{user.username}</Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            )
          }</TableBody>
        </Table>
      </TableContainer>
    </div>)}


export default UsersInfo