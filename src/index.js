// imported dotenv
import dotenv from"dotenv";


// imported mongoose below
// import mongoose from "mongoose";

// imported database below
// import{ DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";

import { app } from "./app.js"


dotenv.config({
    path: './env'
})


connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed!!", err);
})




/*
// imported express below
import express from "express"
const app = express()

(async() =>{
    try{
        // in the below command we had connected mongodb and database
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        // listeners that app uses as used beloe of error
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${
                process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ", error)
        throw err
    }
})()
    */
   