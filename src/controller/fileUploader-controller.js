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
        } else {
          imagefilepath = `/uploads/${filename}`
          res.send('File uploaded. The filepath is ' + imagefilepath)
        }
      })
    }
    console.log(imagefilepath)
    return imagefilepath
  }


}