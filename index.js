require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

/* 
const Person = mongoose.model('Person', personSchema) */

app.use(cors())
app.use(express.static('dist'))

/* let persons = [
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
] */



app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => { 
    response.json(persons)
  console.log(persons)
  })
})


app.get('/api/persons/:id', (request, response) => {

 Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
          } else {
            response.status(404).end()
          }
    })
    .catch(error => next(error) )
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
    Person.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
       .catch(error => next(error))
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

    /* if (Person.find(p => p.name === body.name)){
        return response.status(400).json({ 
          error: `${body.name} already added to phonebook.` 
        })
      } */
  
    else {const person = new Person({
        name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
  }
  
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
