const zod = require("zod");
const User = require("../models/User");
const { generateToken } = require('../utils/jwtAuth');
const bcrypt = require("bcrypt");



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
        const { success, error } = signupBody.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect inputs",
                errors: error.formErrors.fieldErrors
            })
        }
        console.log('Checking email:', req.body.email);  // Debug log
        const existingUser = await User.findOne({
            email: req.body.email
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already taken",
                errors: {
                    email: "email already exists"
                }
            })
        }
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber
        })
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

        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

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