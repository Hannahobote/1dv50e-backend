import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
import { ImageController } from '../controller/image-controller.js'
import { upload } from '../controller/multerConfig.js'
const image = new ImageController()
const auth = new AuthController()
export const router = express.Router()

// create
router.post('/', auth.authorize, upload.single('image'), (req, res, next) => image.create(req, res, next))

// Read one
router.get('/:id', auth.authorize, (req, res, next) => image.readOne(req, res , next))

// read all 
router.get('/', auth.authorize, (req, res, next) => image.readAll(req, res , next))

// update one 
router.patch('/:id', auth.authorize, upload.single('image'), (req, res, next) => image.update(req, res , next))

// delete one
router.delete('/:id', auth.authorize, (req, res, next) => image.delete(req, res , next))