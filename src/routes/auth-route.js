import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const authController = new AuthController()

// read all user
router.get('/', authController.authorize, (req, res, next) => authController.read(req, res, next))

// read one user
router.get('/:id', authController.authorize, (req, res, next) => authController.readOne(req, res, next))

// create a user
router.post('/', authController.authorize, (req, res, next) => authController.create(req, res, next))

// update a user
router.patch('/:id', authController.authorize, (req, res, next) => authController.update(req, res, next))


// delete a user
router.delete('/:id', authController.authorize, (req, res, next) => authController.delete(req, res, next))

// login
router.post('/login', (req, res, next) => authController.login(req, res, next))

// current user
router.get('/current-user', authController.authorize, (req, res, next) => authController.currentUser(req, res, next))

