const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const isAdmin=async(req, res, next)=> {
    console.log(req.cookies.jwt)
    try {
      let token1 = req.cookies.jwt;
    if(token1){
      let verifyToken = jwt.verify(token1, process.env.JWT_SECRET);
      const r_user = await User.findOne({ _id: verifyToken.userid });
   
      req.r_user = r_user;
      req.uid=r_user._id
      // console.log("the requested user id is",req.uid)
      if (r_user.role=="admin") {
        next();
      } else {
        res.status(402).json({ mesg:"unAuthorized user"});
      }
    }
    else{
        res.status(404).json({ mesg:"user not found"});
   
    }
    } catch (error) {
res.status(400).json({"error":error})    }
}  

module.exports = isAdmin