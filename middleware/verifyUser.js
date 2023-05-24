const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
	const accessToken = req.headers?.authorization?.split(' ')?.[1];

	if (!accessToken) {
		return res.status(401).json({
			status: 'fail',
			message: 'Authorization failed, Please login!',
		});
	}
	try {
		const userData = jwt.verify(
			accessToken,
			process.env.ACCESS_TOKEN_SECRET
		);

		req.body.id = userData.id;
		next();
	} catch (error) {
		res.status(401).json({
			status: 'fail',
			message: 'Invalid token!',
		});
	}
};

module.exports = verifyUser;
