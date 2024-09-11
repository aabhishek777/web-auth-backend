


export const registerUser = async (req, res) => {
	
	const {username,password} = req.body
	
	console.log(username,password);
	
	res.status(200).json({msg:'success'})
	

}