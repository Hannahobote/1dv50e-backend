/**
 * källhändvisa youtube
 */

//import fsExtra from "fs-extra/esm"
import fs from 'fs'

import path from "path"
import { v4 as uuidv4 } from 'uuid';
export class FileUploaderController {

  async upload(req, res, next) {
    let imagefilepath
    if (req.files) {
      console.log('file upload ', req.files)
      let file = req.files.design
      //file.name = `${file.name}-${Date()}`
      let filename = file.name
      file.mv('./uploads/' + filename, function (err) {
        if (err) {
          res.send(err)
        }

      })

      //rename file, after file is moved.
      let newFileName = `${uuidv4()}-` + filename;
      imagefilepath = path.join('/uploads/', newFileName);

      let uploadPath = path.join('/uploads/', filename);
      fs.rename(uploadPath, imagefilepath)
      console.log('new file name ', imagefilepath)
    }
    console.log(imagefilepath)
  }


}