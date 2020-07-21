const router = require('express').Router();


router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			// hash the password with a time complexity of "5"
			password: await bcrypt.hash(password, 5),
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
