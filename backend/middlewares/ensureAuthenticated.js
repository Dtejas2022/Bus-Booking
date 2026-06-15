const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const ensureAuthenticated=async(req, res, next)=> {
    console.log(req.cookies.jwt)
    try {
      let token1 = req.cookies.jwt;
    if(token1){
      let verifyToken = jwt.verify(token1, process.env.JWT_SECRET);
      const r_user = await User.findOne({ _id: verifyToken.userid });
   
      req.r_user = r_user;
      req.uid=r_user._id
      // console.log("the requested user id is",req.uid)
      if (r_user) {
        next();
      } else {
        res.json({ mesg:"fail"});
      }
    }
    else{
      res.json({ mesg:"fail"})
   
    }
    } catch (error) {
      console.log("error while accessing authenticated routes", error);
    }
}  

module.exports = ensureAuthenticated