import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
import { CakeOrderController } from '../controller/cakeOrder-controller.js'
export const router = express.Router()
import { upload } from '../controller/multerConfig.js'
const cake = new CakeOrderController()
const auth = new AuthController()

// create
router.post('/', upload.single('design'), (req, res, next) => cake.create(req, res, next))

// Read one
router.get('/:id', (req, res, next) => cake.readOne(req, res , next))

// read all 
router.get('/', auth.authorize, (req, res, next) => cake.readAll(req, res , next))


// update one 
router.patch('/:id', auth.authorize, upload.single('design'), (req, res, next) => cake.update(req, res , next))

// delete one 
router.delete('/:id', auth.authorize, (req, res, next) => cake.delete(req, res , next))