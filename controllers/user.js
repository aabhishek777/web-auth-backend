// used for password hasing
import argon2 from "argon2";
import jwt from 'jsonwebtoken'

import {generateRegistrationOptions} from '@simplewebauthn/server'



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
	const user = new User({username,password: hashedPassword});
	let jwtToken = null
	
	console.log(user);
	try {
		await user.save();
		jwtToken = await jwt.sign({id:user._id,username:user.username},process.env.JWTSECRET, {   expiresIn: '24h'} );
		
	} catch(error) {
		// console.log(error);		
		console.error(error);
		genericResponse(res, 400, 'error')
		return 
	}
	const data= {token:jwtToken, user:{id:user._id,username:user.username}}


	// console.log(hashedPassword);

	// const data= {
	// 	hashedPassword,
		
	// }

	// if(argon2.verify(hashedPassword,password)) {
	// 	console.log('matched');
	// 	data.verify = true;
	// }
	
	
	genericResponse(res,200,'success',data )

}



export const registerChallangeOfUser = async (req,res) => {

	if(!req.headers['authorization'])
		return genericResponse(res,400,'not a valid token')
	const token = req.headers['authorization'].split(' ')[1]

	// console.log(token);
	if(!token)
		return genericResponse(res,400,'not a valid token')

	try {
		const validToken = jwt.verify(token,process.env.JWTSECRET);

		if(!validToken)
			return genericResponse(res,400,'not a valid token')

		const {id}= await jwt.decode(token)

		console.log(id);
		

	} catch(error) {
		return genericResponse(res,400,error)
		
	}

	
	return genericResponse(res,400)


	// const challange = await generateRegistrationOptions()

}