const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

// Configuration
const port = app.get('port') || 8080

app.use(morgan('dev'))

// Routes
const auth = require('./routes/auth')

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// basic route
app.get('/', (req, res) => {
  res.send(`The API is at http://localhost:${port}`)
})

// API routers
app.use('/', auth)

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
  res.status(status).json({
    error: {
      message: error.message
    }
  })
})

app.listen(port, () => {
  console.log(`Server has started on port ${port}!`)
})
