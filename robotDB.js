const robotdb = require('./data.js')
const pgPromise = require('pg-promise')()
const database = pgPromise({ database: 'robot-db' })

database
  .task('robots', task => {
    console.log('Data has moved')
    robotdb.forEach(robotInfo => {
      const insertRobot = {
        username: robotInfo.username,
        name: robotInfo.name,
        avatar: robotInfo.avatar,
        email: robotInfo.email,
        university: robotInfo.university,
        job: robotInfo.job,
        company: robotInfo.company,
        phone: robotInfo.phone,
        street_number: robotInfo.address.street_num,
        street_name: robotInfo.address.street_name,
        city: robotInfo.address.city,
        state: robotInfo.address.state_or_province,
        postal_code: robotInfo.address.postal_code,
        country: robotInfo.address.country
      }
      database
        .one(
          `INSERT INTO robots (username, name, avatar, email, university, job, company, phone, street_number,
        street_name, city, state, postal_code, country)
        VALUES($(username), $(name), $(avatar), $(email), $(university), $(job), $(company), $(phone),
        $(street_number), $(street_name), $(city), $(state), $(postal_code), $(country)) RETURNING id`,
          insertRobot
        )
        .then(insertRobot => {
          console.log(insertRobot)
        })
    })
    console.log('Moved your Data')
  })
  .catch(error => {
    console.log(error)
  })
