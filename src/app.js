const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth = require('./routes/auth')
const verifyEmail = require('./routes/verifyEmail')
const exercise = require('./routes/exercise')
const workout = require('./routes/workout')

const config = require('../config')
const { checkToken } = require('./utils/token')

const app = express()

// Configuration
const port = app.get('port') || 8080

mongoose.connect(config.database.url, config.database.options)
  .then(() => console.log('Database connected'))
mongoose.connection.on('error', error => {throw error})
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.set('superSecret', config.secret) // secret variable

app.use(cors())
app.use(morgan('dev'))

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// basic route
app.get('/', (req, res) => {
  res.send(`The API is at http://localhost:${port}`)
})

// API routers
app.use('/', auth)
app.use('/verify-email', verifyEmail)
app.use('/exercises', checkToken, exercise)
app.use('/workout', checkToken, workout)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler function
app.use((err, req, res) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  res.status(status).json({ error: { message: error.message } })
})

app.listen(port, () => {
  console.log(`Server has started on port ${port}!`)
})
