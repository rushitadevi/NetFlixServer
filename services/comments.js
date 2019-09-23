const express = require('express')
const fs = require("fs")
const router = express.Router()
const Id=require("shortid")
const PDFDocument = require('pdfkit');
//var multer  = require('multer')
//var upload = multer()
const doc = new PDFDocument;


router.get('/',(request,response)=>{
    console.log(request.body)
    var buffer = fs.readFileSync("./Comments.json");
    var content = buffer.toString()
    response.send(content)
})

router.get('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./Comments.json");
    var content = buffer.toString()
    var CommentsDB = JSON.parse(content)
    var comment = CommentsDB.filter(x => x.elementId == request.params.id)
    console.log(comment)
    if (!comment)
    response.send("No comment Yet... ")
    else
    response.send(comment)

    
})

router.delete('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./Comments.json");
    var content = buffer.toString()
    var ReviewsDB = JSON.parse(content)
    console.log(ReviewsDB)
    var review = ReviewsDB.find(x => x._id != request.params._id)
    console.log(review)
    fs.writeFileSync("./Comments.json", JSON.stringify(review))
    response.send(review)
    
})

router.post("/",(request,response)=>{
    var reqBody=request.body 
    
    var buffer = fs.readFileSync("./Comments.json");
    var content = buffer.toString()
    var reviewDB = JSON.parse(content)
    reqBody._id = Id.generate()
   reqBody.createdAt=new Date();
    reviewDB.push(reqBody)
    console.log(reqBody)
    fs.writeFileSync("./Comments.json", JSON.stringify(reviewDB))
    response.send(reviewDB)
})

router.put('/:id',(request,response)=>{
    var buffer = fs.readFileSync("./Comments.json");
    var content = buffer.toString()
    var reviewsDB = JSON.parse(content)
    var newDb = reviewsDB.filter(x => x.elementId != request.params.id) //removing previous item
    var review = request.body;
    review._id = request.params.id;
    newDb.push(review) //adding new item 
    fs.writeFileSync("./Comments.json", JSON.stringify(newDb))
    response.send(newDb)
})

module.exports = router;