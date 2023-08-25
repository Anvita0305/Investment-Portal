const express = require("express");
 const multer = require("multer");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// const { promisify } = require("util");
const path = require('path');
require("dotenv").config()
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name:"jobohunt",
  api_key:"937199435421856",
  api_secret:"gcfIlECosmTamuJ50-1A27VG8T8"
})
//  const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function(req, file, cb){
    if(!file.mimetype.match(/jpg|jpeg|pdf|gif|png/)){
      cb('Error: File is not supported',false)
      return
    }
    cb(null,true)
  }
}).single('image')

router.post("/resume", (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.status(400).json( {
        message: "Error in uploading"
      });
    } else {
      console.log(req.file.size)
      console.log("file recieved"+req.file.originalname)
      
      //console.log(req)
      if(req.file == undefined){
        res.status(400).json( {
          message: 'Error: No File Selected!'
        });
      } else {
        console.log(req.file.path)
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
          if (err) {
            res.status(400).json( {
              message: 'Error: No File Selected!'
            });
          }
          console.log(result.secure_url) ;
          console.log("file uploaded")
          res.send({
            message:"File uploaded successfully!",
            url:`${result.secure_url}`
          })
      });
      }
    }
  });
})

router.post("/profile", (req, res) => {
  // upload(req, res, (err) => {
  //   console.log("upload profile");
  //   if(err){
  //     console.log("errror"+err);
  //     res.status(400).json( {
  //       message: "Error in uploading"
  //     });
  //   } else {
  //     console.log("fileeee  "+req.file);
  //     if(req.file == undefined){
  //       res.status(400).json( {
  //         message: 'Error: No File Selected!'
  //       });
  //     } else {
  //       console.log("Image uploaded")
  //       res.send( {
  //         message: 'Image Uploaded!',
  //         url: `/host/profile/${req.file.filename}`,
  //       });
  //     }
  //   }
  // });

  upload(req, res, (err) => {
    if(err){
      res.status(400).json( {
        message: "Error in uploading"
      });
    } else {
      console.log(req.file.size)
      console.log("file recieved"+req.file.originalname)
      
      //console.log(req)
      if(req.file == undefined){
        res.status(400).json( {
          message: 'Error: No File Selected!'
        });
      } else {
        console.log(req.file.path)
        cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
          if (err) {
            res.status(400).json( {
              message: 'Error: No File Selected!'
            });
          }
          console.log(result.secure_url) ;
          console.log("file uploaded")
          res.send({
            message:"Image uploaded successfully!",
            url:`${result.secure_url}`
          })
      });
      }
    }
  });
  
})
  


/*
router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;
  if (file.detectedFileExtension != ".pdf") {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
    )
      .then(() => {
        res.send({
          message: "File uploaded successfully",
          url: `/host/resume/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});

router.post("/profile", upload.single("file"), (req, res) => {
  const { file } = req;
  if (
    file.detectedFileExtension != ".jpg" &&
    file.detectedFileExtension != ".png"
  ) {
    res.status(400).json({
      message: "Invalid format",
    });
  } else {
    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
    )
      .then(() => {
        res.send({
          message: "Profile image uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Error while uploading",
        });
      });
  }
});
*/
module.exports = router;
