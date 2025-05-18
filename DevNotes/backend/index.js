import express from 'express'
import mongoose from 'mongoose'
import { PORT, MongoURL } from './config.js'
import {blogRoutes} from './routes/BlogRoute.js'
const app = express()

app.get('/', (req, res) =>{
    res.status(200).send('This is Home Page')
})
app.use(express.json()); 

app.use('/blogs', blogRoutes)

mongoose
.connect(MongoURL)
.then(() =>{
    console.log('App Connected to server')
    app.listen(PORT, ()=>{
    console.log(`Server is Listening on ${PORT}....`)
    })
})
.catch((err) =>{
  console.log(err)
})