const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const postRoutes = require('./resources/posts/post.router.js')
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routing
app.use('/api/posts', postRoutes)

// Port
const PORT = 5000 || process.env.PORT

app.listen('5000', () => console.log(`Server Running on port ${PORT}`))
