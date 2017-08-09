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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  database.any(`SELECT * from "robots"`).then(robots => {
    response.render('index', { robots })
  })
})

app.get('/input', (request, response) => {
  response.render('input')
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
  const insertRobot = {
    username: request.body.username,
    name: request.body.name,
    avatar: request.body.avatar,
    email: request.body.email,
    university: request.body.university,
    job: request.body.job,
    company: request.body.company,
    phone: request.body.phone,
    street_number: request.body.street_number,
    street_name: request.body.street_name,
    city: request.body.city,
    state: request.body.state,
    postal_code: request.body.postal_code,
    country: request.body.country
  }
  database
    .one(
      `INSERT INTO robots (username, name, avatar, email, university, job, company, phone, street_number,
    street_name, city, state, postal_code, country)
    VALUES($(username), $(name), $(avatar), $(email), $(university), $(job), $(company), $(phone),
    $(street_number), $(street_name), $(city), $(state), $(postal_code), $(country)) RETURNING id`,
      insertRobot
    )
    .then(insertRobotId => {
      robot_id: insertRobotId.id
    })
  response.redirect('/')
})

app.delete('/info/:id', (request, response) => {
  const id = request.params.id
  database.one(`DELETE FROM "robots" WHERE id = $1`, [id]).then(robot => {
    response.redirect('/')
  })
})

app.listen(3000, () => {
  console.log('It is alive!!!!')
})
