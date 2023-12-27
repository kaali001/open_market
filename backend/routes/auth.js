
const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
	try {
            
		console.log("Received request:", req.body);


		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword){
			return res.status(401).send({ message: "Invalidi Email or Password" });
		}

			console.log("Before JWT sign:",user);


	    const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY); // Replace 'your-secret-key' with your actual secret key
	    // user.tokens = user.tokens.concat({ token });
		// await user.save();

         
		console.log("After JWT sign:",token);

		res.status(200).send({ user:token , message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("email"),
		password: Joi.string().required().label("password"),
	});
	return schema.validate(data);
};

module.exports = router;