/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 2.0.0
 */

import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { router as authRouter } from './routes/auth-route.js'
import { router as cheesecakeRouter } from './routes/cheesecake-route.js'
import { router as cakeRoute } from './routes/cake-route.js'
import { router as cupcakeRoute } from './routes/cupcake-route.js'
import { router as imageRouter } from './routes/image-route.js'
import { router as ordersRoute } from './routes/orders-route.js'
import { connectDB } from './config/mongose.js'
import { readAllImgInServer } from './controller/image-controller.js'
dotenv.config()


// Set the base URL to use for all relative URLs in a document.
const baseURL = process.env.BASE_URL || '/'

// connect to mongodb 
await connectDB()

// Create Express application.
export const app = express()

// Set up a morgan logger using the dev format for log entries.
app.use(logger('dev'))

// Parse requests of the content type application/json.
app.use(express.json())

// Parse requests of the content type application/x-www-form-urlencoded.
// Populates the request object with a body object (req.body).
app.use(express.urlencoded({ extended: false }))

// Middleware to be executed before the routes.
app.use((req, res, next) => {
  // Pass the base URL to the views.
  res.locals.baseURL = baseURL

  next()
})

// enable cors to client
/*const corsOptions = {
  origin: process.env.CORS
}
app.use(cors(corsOptions))*/

app.use(cors());
// Register routes.
app.use('/api/order/cake', cakeRoute)
app.use('/api/order/cupcake', cupcakeRoute)
app.use('/api/order/cheesecake', cheesecakeRouter)
app.use('/api/orders', ordersRoute)
app.use('/api/image', imageRouter)
app.use('/api/auth', authRouter)
app.use('/api/uploads', readAllImgInServer)


// Error handler.
app.use(function (err, req, res, next) {
  res
    .status(err.status || 500)
    .send(err.message || 'Internal Server Error')
})

// Starts the HTTP server listening for connections.
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
