const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public

exports.registerUser = async (req,res) => {
    try{
        const{ name, email, password } = req.body;
        
        
        // 1. validae input
        if (!name ||  !email || !password){
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // 2. check if user already exists

        const existingUser = await User.findOne({email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // 3. create new user
        const user = await User.create({
            name,
            email,
            password
        });

        //4. send success response

        res .status(201);json({
            message: "User registered successfully",
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

        }catch  (error){
            res .status(500).json({
                message: error.message
            });
    }
            
};