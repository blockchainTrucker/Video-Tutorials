module.exports = {
	development: {
		port: process.env.PORT || 3000,
	},
	production: {},
	saltRounds: 9,
	jwt: {
		secret: "videotutorials",
		options: {
			expiresIn: "7d",
		},
	},
};
