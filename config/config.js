module.exports = {
	development: {
		port: process.env.PORT || 9999,
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
