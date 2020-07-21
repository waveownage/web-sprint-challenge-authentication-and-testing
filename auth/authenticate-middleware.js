const jwt = require("jsonwebtoken")


function restrict(role) {
	return async (req, res, next) => {
		const authError = {
			you: "shall not pass!",
		}

		try {
			const token = req.cookies.token

			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
			}

			if (role && decoded.userRole !== role) {
				return res.status(401).json(authError)
			}

			next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict

