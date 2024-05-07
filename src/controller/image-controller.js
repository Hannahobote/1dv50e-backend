import { Image } from "../models/image-model.js"
import path from "path"
import fs from "fs"


export class ImageController {
  async create(req, res, next) {
    try {
      const image = new Image({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        category: req.body.category,
        image: req.file.path,
      })
      await image.save()
      res
        .status(201)
        .json(image)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async readAll(req, res, next) {
    try {
      const img = await Image.find()
      res
        .status(200)
        .send(img)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      if (await Image.findById({ _id: req.params.id })) {
        const img = await Image.findById({ _id: req.params.id })
        res
          .status(200)
          .send(img)
      } else {
        res
          .status(404)
          .send('Image not found')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async imageInServer2(req, res, next) {
    try {
      const img  = `../../uploads/${req.params.id}`
      console.log(img)
      if (!img) {
        res
          .status(200)
          .send(img)
      } else {
        res
          .status(404)
          .send('Image not found')
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async imageInServer(req, res, next) {
    const { filename } = req.params;
    const filePath = path.resolve('uploads', filename);
    
    // Send the image file as a response
    res.sendFile(filePath);
  }
  


  async update(req, res, next) {
    try {
      if (await Image.findOne({ _id: req.params.id })) {
        
        const result = await Image.updateOne({ _id: req.params.id }, {
          name: req.body.name,
          description: req.body.description,
          cost: req.body.cost,
          category: req.body.category,
          image: req.file.path,
        })

        // validate update
        if (result.acknowledged) {
          // send updated 
          const img = await Image.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated image': img })
        } else {
          res
            .status(400)
            .send({ msg: 'Could not update' })
        }

      } else {
        res
          .status(404)
          .send('image not found')
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      if (await Image.findById({ _id: req.params.id })) {
        await Image.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .send('Image not found')
          .end()
      }
    } catch (error) {
      next(error)
    }
  }
}