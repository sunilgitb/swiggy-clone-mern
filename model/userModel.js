const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A user must have name'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'A user must have email'],
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: 'Please enter a valid email',
			isAsync: false,
		},
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'A user must have password'],
	},
	orderList: {
		type: Array,
		default: [],
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
