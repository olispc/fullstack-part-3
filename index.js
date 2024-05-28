require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('dist'))




app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => { 
    response.json(persons)
  })
  .catch(error => next(error))
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





  
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    {const person = new Person({
        name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
  }
  
  })

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    {name, number}, 
    {new: true, runValidators: true, context: 'query'}
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
