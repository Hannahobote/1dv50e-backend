import { CakeOrder } from "../models/cakeOrder-model.js"
import { CupcakeOrder } from "../models/cupcakeOrder-model.js"
import { CheesecakeOrder } from "../models/cheesecakeOrder-model.js"


export async function readAllorders(req, res, next) {
  try {
    const cakes = await CakeOrder.find()
    const cupcakes = await CupcakeOrder.find()
    const cheesecake = await CheesecakeOrder.find()
    const orders = [cakes, cupcakes, cheesecake].flat()
    const data = orders.sort((a, b) => a.delivery_date - b.delivery_date)

    res
      .status(200)
      .send(data)
  } catch (error) {
    next(error)
  }
}