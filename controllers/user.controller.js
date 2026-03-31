const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
  *@name: Register User
  *@description: register a new user accept name,email,password
  *@access: private
 */

const register = async(req,res) => {
    try{
       const {username, email, password} = req.body;

       if(!username || !email ||!password) {
        return res.json({
            success: false,
            message: 'Missing Details'
        })
       }
       const existingUser = await User.findOne({email})

       if(existingUser) return res.json({
            success: false,
            message: 'User already exists'
        })

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,email, password: hashedpassword
        })

        const token = jwt.sign({
            userid:user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true, //prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production', //use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict', //CSRF protection
            maxAge: 7*24*60*60*1000, //Cookie expiration time
        })

        return res.json({
            success: true,
            user : {email: user.email, name: user.username}
        })
    }
    catch(error){
        console.log(error.message);
        res.json({
            success: false, message: error.message
        })
    }
}

/**
  *@name: Login User
  *@description: login a user accept email,password
  *@access: private
 */

const login = async(req,res)=>{
    try{
       const{email, password} = req.body;

       if(!email || !password) return res.json({
        success: false,
        message: 'Email and password are required'
       });

       const user = await User.findOne({email});

       if(!user){
        return res.json({
        success: false,
        message: 'Invalid email or password'
       });
       }

       if (!user.password) {
  return res.status(400).json({
    success: false,
    message: "This account was created with Google. Please login with Google."
  });
}

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return res.json({
        success: false,
        message: 'Invalid email or password'
       });
       }
       
       const token = jwt.sign({
            userid:user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
            maxAge: 7*24*60*60*1000,
        })

        return res.json({
            success: true,
            user : {email: user.email, name: user.username}
        })
    }
    catch(error){
     console.log(error.message);
        res.json({
            success: false, message: error.message
        })
    }
} 

/**
  *@name: Google Login 
  *@description: login a user accept googleId | email | 
  *@access: private
 */

const googleCallback = (req, res) => {
  try {
    const user = req.user;

    //Generate JWT
    const token = jwt.sign(
      { userid: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Send response
    return res.json({
      success: true,
      user: {
        email: user.email,
        name: user.username, // make sure matches your schema
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Google auth failed",
    });
  }
};

//Logout User : /api/user/logout

const logout = async (req,res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none':'strict',
        });
        return res.json({success: true, message: "Logged Out"})
    }
    catch(error){
     console.log(error.message);
        res.json({
            success: false, message: error.message
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    googleCallback
};