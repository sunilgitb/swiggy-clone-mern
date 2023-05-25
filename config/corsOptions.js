const corsOptions = {
	origin: '*',
	// origin: process.env.FRONTEND_HOMEPAGE,
	credentials: true,
	methods: 'POST',
};
module.exports = corsOptions;
