import { CupcakeOrder } from "../models/cupcakeOrder-model.js"

export class CupcakeOrderController {
  async create(req, res, next) {
    try {
      const cake = new CupcakeOrder({
        name: req.body.name,
        surname: req.body.surname,
        phonenr: req.body.phonenr,
        epost: req.body.epost,
        delivery_adress: req.body.delivery_adress,
        delivery_date: req.body.delivery_date,
        amount: req.body.amount,
        taste: req.body.taste,
        frosting: req.body.frosting,
        design: req.body.design,
        price: req.body.price,
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
      const cakes = await CupcakeOrder.find()
      res
        .status(200)
        .send(cakes)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      if (await CupcakeOrder.findById({ _id: req.params.id })) {
        const cake = await CupcakeOrder.findById({ _id: req.params.id })
        res
          .status(200)
          .send(cake)
      } else {
        res
          .status(404)
          .send('cupcake order not found')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      if (await CupcakeOrder.findById({ _id: req.params.id })) {

        const result = await CupcakeOrder.updateOne({ _id: req.params.id }, {
          name: req.body.name,
          surname: req.body.surname,
          phonenr: req.body.phonenr,
          epost: req.body.epost,
          delivery_adress: req.body.delivery_adress,
          delivery_date: req.body.delivery_date,
          amount: req.body.amount,
          taste: req.body.taste,
          frosting: req.body.frosting,
          design: req.body.design,
          price: req.body.price,
          status: req.body.status
        })

        // validate update
        if (result.acknowledged) {
          // send updated 
          const updatedCakeOrder = await CupcakeOrder.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated cupcake order': updatedCakeOrder })
        } else {
          res
            .status(400)
            .send({ msg: 'Could not update' })
        }

      } else {
        res
          .status(404)
          .send('cupcake order not found')
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      if (await CupcakeOrder.findById({ _id: req.params.id })) {
        await CupcakeOrder.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .send('cupcake order not found')
          .end()
      }
    } catch (error) {
      next(error)
    }
  }
}