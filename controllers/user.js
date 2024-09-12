
import  argon2  from "argon2";



import {genericResponse} from "../utils/genericResponse.js";
import {User} from "../schema/user.js";





export const registerUser = async (req, res) => {
	
	const {username,password} = req.body

	if(!username && !password) {
		genericResponse(res,400)
		return;
	}
	
	
	console.log(username,password);
	// console.log(req);


	const hashedPassword = await argon2.hash(password);
	const user = new User({username,hashedPassword});

	try {
		await user.save();
		
	} catch(error) {
		genericResponse(res, 400, 'error')
		return 
	}

	// console.log(hashedPassword);

	// const data= {
	// 	hashedPassword,
		
	// }

	// if(argon2.verify(hashedPassword,password)) {
	// 	console.log('matched');
	// 	data.verify = true;
	// }
	
	
	genericResponse(res,200,'success',user )

	

}