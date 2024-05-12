import { CheesecakeOrder } from "../models/cheesecakeOrder-model.js"

export class CheesecakeOrderController {
  async create(req, res, next) {
    try {
      const cake = new CheesecakeOrder({
        name: req.body.name,
        surname: req.body.surname,
        phonenr: req.body.phonenr,
        epost: req.body.epost,
        delivery_adress: req.body.delivery_adress,
        delivery_date: req.body.delivery_date,
        amount: req.body.amount,
        taste: req.body.taste,
        design: req.file.path, // save image path
        price: req.body.price,
        status: req.body.status,
        category: req.body.category
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
      const cakes = await CheesecakeOrder.find()
      res
        .status(200)
        .send(cakes)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      if (await CheesecakeOrder.findById({ _id: req.params.id })) {
        const cake = await CheesecakeOrder.findById({ _id: req.params.id })
        res
          .status(200)
          .send(cake)
      } else {
        res
          .status(404)
          .send('cheesecake order not found')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {

      const prevOrder = await CheesecakeOrder.findById({ _id: req.params.id })
      if (prevOrder) {
        let imagePath;
        if (!req.file) {
          imagePath = prevOrder.design
        } else {
          imagePath = req.file.path // save image path
        }

        const result = await CheesecakeOrder.updateOne({ _id: req.params.id }, {
          name: req.body.name,
          surname: req.body.surname,
          phonenr: req.body.phonenr,
          epost: req.body.epost,
          delivery_adress: req.body.delivery_adress,
          delivery_date: req.body.delivery_date,
          amount: req.body.amount,
          taste: req.body.taste,
          design: imagePath, // save image path
          price: req.body.price,
          status: req.body.status,
          category: req.body.category

        })

        // validate update
        if (result.acknowledged) {
          // send updated 
          const updatedCheesecakeOrder = await CheesecakeOrder.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated cheesecake order': updatedCheesecakeOrder })
        } else {
          res
            .status(400)
            .send({ msg: 'Could not update' })
        }

      } else {
        res
          .status(404)
          .send('cheesecake order not found')
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      if (await CheesecakeOrder.findById({ _id: req.params.id })) {
        await CheesecakeOrder.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .send('cheesecake order not found')
          .end()
      }
    } catch (error) {
      next(error)
    }
  }
}