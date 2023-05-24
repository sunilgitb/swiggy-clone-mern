const Mailgen = require('mailgen');
const resetPasswordMail = (name, link) => {
	const mailGenerator = new Mailgen({
		theme: 'salted',
		product: {
			// Appears in header & footer of e-mails
			name: 'Swiggy Clone',
			link: 'https://swiggy-vivek.vercel.app/',
			// Optional product logo
			// logo: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza',
		},
	});
	const email = {
		body: {
			name: name,
			intro: 'You have recieved this email becouse a password reset request for your Swiggy Clone account was recived.',
			action: {
				instructions: 'Click the button below to reset your password:',
				button: {
					color: '#DC4D2F', // Optional action button color
					text: 'Reset your password',
					link: link,
				},
			},
			outro: 'If you did not request a password reset, no further action is required on your part.',
		},
	};
	const emailBody = mailGenerator.generate(email);
	return emailBody;
};
const verifyAccountMail = (name, link) => {
	const mailGenerator = new Mailgen({
		theme: 'salted',
		product: {
			// Appears in header & footer of e-mails
			name: 'Swiggy Clone',
			link: 'https://swiggy-vivek.vercel.app/',
			// Optional product logo
			// logo: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza',
		},
	});
	const email = {
		body: {
			name: name,
			intro: 'You have recieved this email becouse a verify account request for your Swiggy Clone account was recived.',
			action: {
				instructions: 'Click the button below to verify your account:',
				button: {
					color: '#22BC66', // Optional action button color
					text: 'Verify your account',
					link: link,
				},
			},
			outro: 'If you did not request for verify account, no further action is required on your part.',
		},
	};
	const emailBody = mailGenerator.generate(email);
	return emailBody;
};

module.exports = { resetPasswordMail, verifyAccountMail };
