import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// Login user

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const token = createToken(user._id);

        res.status(200).json({ success: true, data: { token } });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

};


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Register user

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // check if user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        // password length is greater than 8 characters or not
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(7); // between 5 to 15, higher the number more secure
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(200).json({
            success: true, data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            }, 
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }


};

export { loginUser, registerUser };