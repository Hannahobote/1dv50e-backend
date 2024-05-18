import { Users } from '../models/users-model.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


export class AuthController {

  async read(req, res, next) {
    try {
      const allUsers = await Users.find({})
      res
        .status(200)
        .send(allUsers)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      const employee = await Users.findById({ _id: req.params.id })
      if (employee) {
        res
          .status(200)
          .send(employee)
      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      //register a user
      //check if username is already registered
      let usernameDuplicate = await Users.find({ username: req.body.username })

      // if email or username is true/exists the thow error
      if (usernameDuplicate[0] !== undefined) {
        res.status(409).send({ description: 'a user with this username already exist.' })
        return
      }

      // hash password
      const hash = await bcrypt.hash(req.body.password, 10)

      // create account
      const employee = new Users({
        username: req.body.username,
        password: hash,
      })

      // save user
      employee.save()

      // send back id as respond
      res
        .status(201)
        .send({ employee })

    } catch (error) {
      next(error)
      res.send(error)
    }
  }

  async update(req, res, next) {
    try {

      if (await Users.findById({ _id: req.params.id })) {
        let result = {}

        // if admin wants to update password, then include in the update
        console.log(req.body.password)
        if (req.body.password) {
          // hash password
          const hash = await bcrypt.hash(req.body.password, 10)
          result = await Users.updateOne({ _id: req.params.id }, {
            username: req.body.username,
            password: hash,
          })

        } else {

          result = await Users.updateOne({ _id: req.params.id }, {
            username: req.body.username
          })
        }

        if (result.acknowledged) {
          // send updated Users 
          const updatedUsers = await Users.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated Users': updatedUsers })
        } else {
          res
            .status(400)
            .send({ msg: 'invalid credentials' })
        }

      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }


  async login(req, res, next) {
    try {
      // find user in database
      const user = await Users.findOne({ username: req.body.username })
      // if database can find user
      if (user) {
        // compare password in db
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        // if the password is valid, send access token.
        if (validPassword) {

          //generate an accesstoken and send it back
          const payload = { user }
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' })

          res
            .status(200)
            .send({
              accessToken,
              user,
              msg: 'Access token will expire after 10 minutes. Kindly log in again when it expires, to get a new token.',
            })

        } else {
          res.status(401).send({ description: 'Credentials invalid or not provided.' })
        }

      } else {
        res.status(404).send({ description: 'User does not exist' })
      }
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      if (await Users.findById({ _id: req.params.id })) {
        // delete one User
        await Users.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authorize: give certain access to user. Cheks i user is logged in.
   *
   * @param {*} req .
   * @param {*} res .
   * @param {*} next .
   * @returns 
   */
  async authorize(req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (token === null) {
        return res.sendStatus(401)
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(401)
        }
        req.user = user
        next()
      })

    } catch (error) {
      next(error)
    }
  }


  async currentUser(req, res, next) {
    try {

      if (req.user.user) {
        res
          .status(200)
          .send({ current_user: req.user.user })
      } else {
        res
          .status(404)
          .send('There is no user signed in at the moment.')
      }
    } catch (error) {
      next(error)
    }
  }
}