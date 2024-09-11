

import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import userRouter from "./model/user.js";




const app = express();

app.use(express.json())


//TODO should be removed in production
config();


const PORT = process.env.PORT | 8000;

const DATABASE_URL = process.env.DATABASE_URL;





const db_connect = async () => {

	console.log('connectting...');


	try {

		await mongoose.connect(DATABASE_URL);

		console.log(`connected successfully to db`);


	} catch(error) {
		console.log(error);
		return;
	}
}
//establishing the connection with db
db_connect()


//test the api
app.get('/',(req,res) => {
	res.status(200).json({msg:'got the response from server'})
})

//user routes are handled from here
app.use('/api/v1',userRouter);



//server is invoked from here
app.listen(PORT,() => {
	console.log(` app is running on the ${PORT} `)
})