const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
var morgan = require('morgan')
app.use(express.static('build'))

morgan.token('postData', (req,res)=>{if (req.method==='POST'){
                        return JSON.stringify(req.body)
                    }
                    else return ""
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))
let phoneBook = [
    {
        id:1,
        name:"Arto Hfere",
        number: "043-443422"
    },
    {
        id:2,
        name:"Ada Lerwer",
        number: "043-443422"
    },
    {
        id:3,
        name:"Dan Abram",
        number: "045-32535"
    },
    {
        id:4,
        name:"Merow eerli",
        number: "043-443422"
    }

]

app.get("/api/persons",(request, response)=>{
response.json(phoneBook)


})

app.get('/api/persons/:id',(req, res)=>{
    id = Number(req.params.id)
const personInfo = phoneBook.find(p => p.id ===id)

if (personInfo) {
    res.json(personInfo)
  } else {
    res.status(404).end()
  }

})

app.delete("/api/persons/:id",(req, res)=>{
    id = Number(req.params.id)
    phoneBook = phoneBook.filter(p=>p.id!==id)
    res.status(204).end()
})

app.post("/api/persons",(req,res)=>{

    body = req.body
console.log(body)
    if (!body.name || !body.number) {
        return res.status(400).json({ 
          error: 'name or number missing' 
        })
      }
    if (phoneBook.find(p=>p.name===body.name)){
        return res.status(400).json({ 
            error: 'name already in phoneBook' 
          })

    }
    newId=Math.floor(Math.random()*100000)
    
      const personInfo = {
        id: newId,
        name: body.name,
        number: body.number
      }
    phoneBook =phoneBook.concat(personInfo)
console.log(phoneBook)
    res.json(personInfo)
})

app.get("/info",(req,res)=>{

    res.send(`<h3>Phonebook has info for ${phoneBook.length} people</h3>
    <h3>${new Date()}</h3>
    `)
})

const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })