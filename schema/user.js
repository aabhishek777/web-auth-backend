import mongoose from "mongoose";	


const userSchema = mongoose.Schema({
	username: {
		required: true,
		type:String
	},
	password: {
		required: true,
		type:String
	},
	optfiled: {
		type:String,
	}
},
	{
		timestamps:true,
	},

)

export const User = mongoose.model('user',userSchema);