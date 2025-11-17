const getHandler = async (event) => {
	console.log('Event:', event);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Go Serverless v4.0! Your function executed successfully!'
		})
	};
};

module.exports = { getHandler };