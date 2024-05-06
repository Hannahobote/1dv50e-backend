import express from 'express'
import { readAllorders } from '../controller/orders-controller.js'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const auth = new AuthController()

// read all orders
router.get('/', auth.authorize, (req, res, next) => readAllorders(req, res, next))