const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync, setAsync} = require('../redis/index')




router.get('/', async (req,res) => {
    counter = await getAsync("added_todos")
    res.send({"added_todos": counter})
  })


module.exports = router