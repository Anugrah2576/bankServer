//import express
const express=require('express')

//import env file
require('dotenv').config()

//import cors
const cors=require('cors')

//import db connection
require('./db/dbconnection')

//import router

const rout=require('./routes/router')

//create serve using express

const server=express()

// connect frontend

server.use(cors())



//to convert all incomming data into js

server.use(express.json())

server.use(rout)

// server.get('/getpath/usernew',(req,res)=>{
//     res.send("get request response...")
// })

// server.get('/getpath/lastusernew',(req,res)=>{
//     res.send("get request responselastuser...")
// })

//port set

const port=3004 || process.env.port

//running config

server.listen(port,()=>{
    console.log(`----Server started at port number ${port}----`);
})
