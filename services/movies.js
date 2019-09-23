const express = require('express')
const fs = require("fs")
const router = express.Router()
//var multer  = require('multer')
//var upload = multer()
var id=require("shortid")

router.get('/',(request,response)=>{
    console.log(request.body)
    var buffer = fs.readFileSync("./movies.json");
    var content = buffer.toString()
    response.send(content)
})

router.get('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./movies.json");
    var content = buffer.toString()
    var MovieDb = JSON.parse(content)
    var movies = MovieDb.filter(x => x.imdbID == request.params.id)
    if (!movies)
    response.send("No Movies Yet... ")
    else
    response.send(movies)
})

router.delete('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./movies.json");
    var content = buffer.toString()
    var MovieDb = JSON.parse(content)
    var review = MovieDb.find(x => x._id != request.params.id)
    fs.writeFileSync("./Files/Products.json", JSON.stringify(review))
    response.send(review)
})

//var multerInstance=new multer({})

router.post("/", (req,response)=>{

    // var fullUrl = req.protocol + "://" + req.get("host") + "/Img/"
    // var ext = req.file.originalname.split(".").reverse()[0];
    // //var path = "./img/" + req.params.id+ext;
   
    // var productID = id.generate()
   
    // var fileName = productID + ext;
    // var buffer = req.file
  
   
    //  fs.writeFile("./Img/" + fileName,buffer)
    // // var reqBody=request.body 
    //     var buffer = fs.readFileSync("./Files/Products.json");
    //     var content = buffer.toString()
    //     var reviewDB = JSON.parse(content)
    console.log("hihi")          
      var newMovie = req.body;
     var newMovie = JSON.parse(req.body.metadata)
     newMovie.createdAt = new Date()
    newMovie.updatedAt = newMovie.createdAt
     newMovie.imdbID = id.generate()
    // newMovie.Image = fullUrl + fileName
     console.log(newMovie)
     products.push(newMovie)
     fs.writeFileSync("./movies.json", JSON.stringify(newMovie));

     response.send(newMovie)
//     console.log(req.body.metadata)
//     var reqBody=request.body 
//     var buffer = fs.readFileSync("./Files/Products.json");
//     var content = buffer.toString()
//     var reviewDB = JSON.parse(content)
//     reqBody._id = reviewDB.length + 1;
//    reqBody.createdAt=new Date();
//     reviewDB.push(reqBody)
//     fs.writeFileSync("./Files/Products.json", JSON.stringify(reviewDB))
//     response.send(reviewDB)
})

router.put('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./movies.json");
    var content = buffer.toString()
    var MovieDb = JSON.parse(content)
    var newDb = MovieDb.filter(x => x._id != request.params.id) //removing previous item
    var review = request.body;
    review._id = request.params.id;
    newDb.push(review) //adding new item 
    fs.writeFileSync("./movies.json", JSON.stringify(newDb))
    response.send(newDb)
})

module.exports = router;