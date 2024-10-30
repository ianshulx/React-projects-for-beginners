const express = require('express')
const dotenv=require('dotenv')
const bodyparser=require('body-parser')
const { MongoClient } = require('mongodb');
const cors=require('cors')
// import express from 'express';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import { MongoClient } from 'mongodb';
// import cors from 'cors';




dotenv.config()






// Connecting to mongodb client
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
client.connect();


// APP & Database 
const dbName = process.env.DB_NAME ;
const app = express()
const port = 3000
// console.log(process.env.MONGO_URI)
//Middlewares
app.use(bodyparser.json())
app.use(cors())



//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
     res.json(findResult)
})
//Save a password
app.post('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
     res.send({success:true,result:findResult})
})

//Delete a passoword by id

app.delete('/', async (req, res) => {
    const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
     res.send({success:true,result:findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})