import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
import { CheesecakeOrderController } from '../controller/cheesecakeOrder-controller.js'
import { upload } from '../controller/multerConfig.js'
export const router = express.Router()
const cake = new CheesecakeOrderController()
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