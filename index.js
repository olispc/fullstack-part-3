const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.get('/info', (request, response) => {
    const timestamp = new Date()
    response.send(`
    Phonebook has info for ${persons.length} people
    <br>
    ${timestamp}`)
})
// create custom token to return request body
morgan.token('body', function(req,res){ return JSON.stringify(req.body)} )
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())



app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })



const generateId = () => {
    return Math.floor(Math.random()*10000)
  }

  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name | !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    if (persons.find(p => p.name === body.name)){
        return response.status(400).json({ 
          error: `${body.name} already added to phonebook.` 
        })
      }
  
    const person = {
        id: generateId(),
        name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})