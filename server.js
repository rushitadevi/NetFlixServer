const express=require("express")
const server=express()
const bodyparser=require("body-parser")

const cors=require("cors")

server.use(cors())
const movies = require("./services/movies")
const comments = require("./services/comments")
const pdf = require("./services/pdfMake")

server.use(bodyparser.json())

server.use("/movies",movies)
server.use("/comments",comments)
//server.use("/pdf",pdf)

server.listen(3005,()=>{
    console.log("I have started on port 3005")
})



