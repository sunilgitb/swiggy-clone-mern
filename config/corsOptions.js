const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:2727',
    'https://swiggy-vivek.vercel.app/',
  ],
  // origin: process.env.FRONTEND_HOMEPAGE,
  credentials: true,
  methods: 'POST, GET',
};
module.exports = corsOptions;
