const User = require('../model/userModel');

const orderController = async (req, res) => {
	const { id } = req.body;
	const orderListNew = req.body.orderList;

	try {
		const user = await User.findOne({ _id: id });
		await User.updateOne(
			{ _id: id },
			{ orderList: [...user.orderList, ...orderListNew] }
		);

		res.status(200).json({
			status: 'success',
			message: 'Order placed successfully!',
		});
	} catch (error) {
		res.status(500).json({
			status: 'fail',
			message: 'Something went wrong!',
		});
	}
};

module.exports = { orderController };
