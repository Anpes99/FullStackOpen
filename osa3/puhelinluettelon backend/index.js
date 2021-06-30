require('dotenv').config()
const express = require('express')
const app = express()
const PhoneNumber = require('./models/phoneNumber')
const cors = require('cors')
app.use(cors())
app.use(express.json())
const morgan = require('morgan')
app.use(express.static('build'))

morgan.token('postData',(req) => {
  if (req.method==='POST')
  {
    return JSON.stringify(req.body)
  }
  else return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


app.get('/api/persons',(request, response) => {

  PhoneNumber.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(phoneNumber => {
      console.log(phoneNumber.name + ' ' + phoneNumber.number)
    })
    console.log(result)
    response.json(result)
  })

})

app.get('/api/persons/:id',(req, res,next) => {
  PhoneNumber.findById(req.params.id).then(phoneNumber => {
    res.json(phoneNumber)
  }).catch((error) => {next(error)}

  )

})

app.delete('/api/persons/:id',(req, res, next) => {

  PhoneNumber.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log(result)
      res.status(204).end()
    })
    .catch(error => next(error)
    )})

app.post('/api/persons',(req,res, next) => {

  var body = req.body


  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const phoneNumber = new PhoneNumber({
    name: body.name,
    number: body.number
  })
  phoneNumber.save().then(savedPhoneNumber => {
    res.json(savedPhoneNumber)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const phoneNumber = {
    name: body.name,
    number: body.number,
    id: body.id
  }

  PhoneNumber.findByIdAndUpdate(req.params.id, phoneNumber,{ new:true })
    .then(updatedPhonenumber => {

      res.json(updatedPhonenumber)

    }).catch(error => next(error))



})

app.get('/info',(req,res,next) => {
  PhoneNumber.find({}).then(result => {
    res.send(`<h3>Phonebook has info for ${result.length} people</h3>
    <h3>${new Date()}</h3>
    `).catch(error => next(error))
  })})


const errorHandler = (error, request, response, next) => {

  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})