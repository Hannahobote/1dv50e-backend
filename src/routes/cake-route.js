import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
import { CakeOrderController } from '../controller/cakeOrder-controller.js'
export const router = express.Router()

const cake = new CakeOrderController()
const auth = new AuthController()

// create
router.post('/', auth.authorize, (req, res, next) => cake.create(req, res, next))

// Read one
router.get('/:id', auth.authorize, (req, res, next) => cake.readOne(req, res , next))

// read all patients
router.get('/', auth.authorize, (req, res, next) => cake.readAll(req, res , next))


// update one patient
router.patch('/:id', auth.authorize, (req, res, next) => cake.update(req, res , next))

// delete one patient
router.delete('/:id', auth.authorize, (req, res, next) => cake.delete(req, res , next))