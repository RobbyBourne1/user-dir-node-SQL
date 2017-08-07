const robotdb = require('./data.js')
const pgPromise = require('pg-promise')()
const database = pgPromise({ database: 'robot-user-dir' })

robotdb
  .task('robots', task => {
    console.log('Data has moved')
    robotdb.forEach(robotInfo => {
      const insertRobot = {
        username: robot.username,
        name: robot.name,
        avatar: robot.avatar,
        email: robot.email,
        university: robot.university,
        job: robot.job,
        company: robot.company,
        phone: robot.phone,
        street_num: robot.address.street_num,
        street_name: robot.address.street_name,
        city: robot.address.city,
        state_or_province: robot.address.state_or_province,
        postal_code: robot.address.postal_code,
        country: robot.address.country
      }
      database
        .one(
          `INSERT INTO robots (username, name, avatar, email, university, job, company, phone, street_num,
        street_name, city, state_or_province, postal_code, country)
        VALUES($(username), $(name), $(avatar), $(email), $(university), $(job), $(company), $(phone),
        $(street_num), $(street_name), $(city), $(state_or_province), $(postal_code), $(country)) RETURNING id`,
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
