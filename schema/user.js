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
},
	{
		timestamp:true,
	}

)

export const User = mongoose.model('user',userSchema);