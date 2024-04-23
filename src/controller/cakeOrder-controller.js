import { CakeOrder } from "../models/cakeOrder-model.js"

export class CakeOrderController {
  async create(req, res, next) {
    try {
      const cake = new CakeOrder({
        name: req.body.name,
        surname: req.body.surname,
        phonenr: req.body.phonenr,
        epost: req.body.epost,
        delivery_adress: req.body.delivery_adress,
        delivery_date: req.body.delivery_date,
        taste: req.body.taste,
        filling: req.body.filling,
        design: req.body.design,
        status: req.body.status
      })

      await cake.save()
      res
        .status(201)
        .json(cake)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async readAll(req, res, next) {
    try {
      const cakes = await CakeOrder.find()
      res
        .status(200)
        .send(cakes)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      if (await CakeOrder.findById({ _id: req.params.id })) {
        const cake = await CakeOrder.findById({ _id: req.params.id })
        res
          .status(200)
          .send(cake)
      } else {
        res
          .status(404)
          .send('cake order not found')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      if (await CakeOrder.findById({ _id: req.params.id })) {

        const result = await CakeOrder.updateOne({ _id: req.params.id }, {
          name: req.body.name,
          surname: req.body.surname,
          phonenr: req.body.phonenr,
          epost: req.body.epost,
          delivery_adress: req.body.delivery_adress,
          delivery_date: req.body.delivery_date,
          taste: req.body.taste,
          filling: req.body.filling,
          design: req.body.design,
          status: req.body.status
        })

        // validate update
        if (result.acknowledged) {
          // send updated 
          const updatedCakeOrder = await Patient.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated cake order': updatedCakeOrder })
        } else {
          res
            .status(400)
            .send({ msg: 'Could not update' })
        }

      } else {
        res
          .status(404)
          .send('cake order not found')
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      if (await CakeOrder.findById({ _id: req.params.id })) {
        await CakeOrder.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .send('Cake order not found')
          .end()
      }
    } catch (error) {
      next(error)
    }
  }
}