const express = require('express')
const mustacheExpress = require('mustache-express')
// const data = require('./data.js')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const pgPromise = require('pg-promise')()
const pg = require('pg')

const app = express()
const database = pgPromise({ database: 'robot-db' })

// CREATE TABLE robots ("id" SERIAL PRIMARY KEY,
// ............................ "username" VARCHAR(100) NOT NULL,
// ............................ "avatar" VARCHAR(100) NULL,
// ............................ "email" VARCHAR(100) NULL,
// ............................ "university" VARCHAR(100) NULL,
// ............................ "street_number" VARCHAR(100) NULL,
// ............................ "street_name" VARCHAR(100) NULL,
// ............................ "city" VARCHAR(100) NULL,
// ............................ "state" VARCHAR(100) NULL,
// ............................ "job" VARCHAR(100) NULL,
// ............................ "company" VARCHAR(100) NULL,
// ............................ "postal_code" VARCHAR(100) NULL,
// ............................ "country" VARCHAR(100)NULL,
// ............................ "phone" VARCHAR(100)NULL,
// ............................ "name" VARCHAR(100)NULL);

app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  database.any(`SELECT * from "robots"`).then(robots => {
    response.render('index', { robots })
  })
})

app.get('/info/:id/', (request, response) => {
  const id = request.params.id
  database
    .one('SELECT * FROM "robots" WHERE id = $1', [id])
    .then(robot => {
      response.render('info', robot)
    })
    .catch(robot => {
      response.render('input', robot)
    })
})

app.post('/addId', (request, response) => {
  response.send('Robot Added')
})

app.listen(3000, () => {
  console.log('It is alive!!!!')
})
