


export const genericResponse = (response, statusCode=200,status='fail',data = {}) => {
	
	return response.status(statusCode).json({msg:status, data})
	
}