import mongoose from "mongoose";	


const userSchema = mongoose.Schema({
	username: {
		require: true,
		type:String
	},
	password: {
		require: true,
		type:String
	}
})

export const User = mongoose.model('user',userSchema);