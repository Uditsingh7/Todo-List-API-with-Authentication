const zod = require("zod"); // importing zod middleware for validating input
const User = require("../models/User");
const { generateToken } = require('../utils/jwtAuth'); // importing jwt auth middleware
const bcrypt = require("bcrypt");


// create user req body  validation schema using Zod
const signupBody = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8),
    mobileNumber: zod.string()
})


// Create a new user
const signUpUser = async (req, res) => {
    try {
        // check for zod validation  error 
        const { success, error } = signupBody.safeParse(req.body)

        //and throw if there is one
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }
        //checking if the user already exists in the database
        const existingUser = await User.findOne({
            email: req.body.email
        })
        // send error responseif exists
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already taken",
                errors: {
                    email: "email already exists"
                }
            })
        }

        // If all fine, create the  user
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber
        })

        // Generate the token for the user upon creation
        const token = generateToken({ id: user._id, username: req.body.email });
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user,
            token
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message || "Error Message"
        });
    }
}


const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Authenticate user by checking the creds and existence
        const user = await User.findOne({ email: username });

        // thrw error if not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        // Throw an error if password is incorrect 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password"
            });
        }
        
        // Create a JSON Web Token that will be used for authentication
        const token = generateToken({ id: user._id, username });

        return res.status(201).json({
            success: true,
            message: 'User logged In successfully',
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.email,
                },
            },
        });

    } catch (error) {
        console.error("Error logging in user:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};




module.exports = {
    signUpUser,
    loginUser
}