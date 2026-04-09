const jwt = require('jsonwebtoken');

const authUser = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: 'Not Authorised'});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!tokenDecode){
            return res.json({success: false, message: 'Not Authorised'});
        }
        req.decoded = tokenDecode 
        next();//execute the controller function
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

module.exports = authUser;