const express = require('express')
const mustacheExpress = require('mustache-express')
// const data = require('./data.js')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const pgPromise = require('pg-promise')()

const app = express()
const database = pgPromise({ database: 'robot-user-dir' })

// CREATE TABLE robots ("id" SERIAL PRIMARY KEY,
// ............................ "username" VARCHAR(100) NOT NULL,
// ............................ "imageurl" VARCHAR(100) NULL,
// ............................ "email" VARCHAR(100) NULL,
// ............................ "university" VARCHAR(100) NULL,
// ............................ "street_number" VARCHAR(100) NULL,
// ............................ "address" VARCHAR(100) NULL,
// ............................ "city" VARCHAR(100) NULL,
// ............................ "state" VARCHAR(100) NULL,
// ............................ "job" VARCHAR(100) NULL,
// ............................ "company" VARCHAR(100) NULL,
// ............................ "postal_code" VARCHAR(100) NULL,
// ............................ "year_built" VARCHAR(100) NULL,
// ............................ "next_service_date" VARCHAR(100) NULL,
// ............................ "is_active" VARCHAR(100) NULL);

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  response.render('index', data)
})

app.get('/info/:name', (request, response) => {
  function findPerson(person) {
    return person.name === request.params.name
  }
  var persons = data.users.find(findPerson)
  response.render('info', persons)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
