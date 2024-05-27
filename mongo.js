const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://oli:${password}@cluster0.7tljnrv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const search = () =>  {Person.find({}).then(result => {   console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })}

const save = (person) => {person.save().then((result) => {
    console.log('person added!')
    mongoose.connection.close()

})}


if(process.argv.length === 3) {
  
    search()
  
}
else if(process.argv.length === 5){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    save(person)

}
else {console.log('provide valid number of args')
process.exit()}

/* const note = new Note({
  content: 'HTML is easy',
  important: true,
}) */

/* note.save().then((result) => {
  console.log('note saved!')
  mongoose.connection.close()
}) */




