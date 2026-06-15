const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")
const Booking= require("../models/booking")
const Pass = require("../models/pass");
const { trusted } = require('mongoose');

const sanitizeUser = (userDocument) => {
    if (!userDocument) {
      return null;
    }

    const user = userDocument.toObject ? userDocument.toObject() : { ...userDocument };
    delete user.password;
    return user;
  };

const createUser = async (req, res) => {
    try {
      const { name,email,mobile,address,amount, password } = req.body;
  
      // Check if username is taken
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        name,email,mobile,address,amount,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Step 4: Generate and sign JWT on successful registration
      // const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET);
  
      // Return the token
      res.status(201).json(sanitizeUser(newUser));
    } catch (error) {
      console.error(error);
      res.status(400).json({"error":error});
    }
  }

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate and sign JWT on successful login
    //   const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
      const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
      res.cookie("jwt",token)
  
      // Return the token
      res.status(200).json({ token,user: sanitizeUser(user) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const getAllUsers=async(req,res)=>{
    try{
      const allusers = await User.find({}).select("-password");
      res.status(200).json(allusers)
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }

  const getUser=async(req,res)=>{
    try{
      const user = await User.findById(req.params.id).select("-password");
      res.status(200).json(user)
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }

  const delUser=async(req,res)=>{
    try{
      const user = await User.deleteOne({_id:req.params.id});
      res.status(200).json(user)
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }

 const updateUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateData = {
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          address: req.body.address,
          amount: req.body.amount != null ? String(req.body.amount) : undefined,
        };

        Object.keys(updateData).forEach((key) => {
          if (updateData[key] === undefined) {
            delete updateData[key];
          }
        });

        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { $set: updateData },
          { new: true, runValidators: true },
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(sanitizeUser(updatedUser));
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(400).json({ error: "Failed to update user" });
    }
};


  const signOut= async(req,res)=>{
    // res.clearCookie('jwt');
try{
  res.clearCookie('jwt');
  res.status(200).json({"mesg":"Log out succesfully"})

}
catch(err){
res.status(400).send("Something went wrong",err)
}
  }

  // bookings
  const getBookingDetails = async (req, res) => {
    try {
        const bookings = await Booking.find({ user_id:req.params.id }).populate('bus_id');
        // const bookings = await Pass.find({ user_id:req.params.id })

        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ "error": err });
    }
}

const getPassingDetails = async (req, res) => {
  try {
      const bookings = await Pass.find({ user_id:req.params.id }).populate('bus_id');
      res.status(200).json(bookings);
  } catch (err) {
      res.status(400).json({ "error": err });
  }
}

const getAllPasses = async (req, res) => {
  try {
    const bookings = await Pass.find({})
      .populate('bus_id')
      .populate({ path: 'user_id', select: '-password' });
    res.status(200).json(bookings);
  } catch (err) {
      res.status(400).json({ "error": err });
  }
}

// Update Pass
const updatePass = async (req, res) => {
      

  try {
      const _id = req.params.id;
      const pass = req.body.pass ;

      // const updatedUser = await Pass.findByIdAndUpdate(_id, {approved:"1"}, { new: true });
      // if (!updatedUser) {
      //     return res.status(404).json({ error: "Pass not found" });
      // }
      // res.status(200).json(updatedUser);
      if(pass=="Daily")
        {
           const updatedUser = await Pass.findByIdAndUpdate(_id, {approvedd:"1"}, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ error: "Pass not found" });
      }
      res.status(200).json(updatedUser);

        }
        else{
           const updatedUser = await Pass.findByIdAndUpdate(_id, {approvedm:"1"}, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ error: "Pass not found" });
      }
      res.status(200).json(updatedUser);

        }
  } catch (err) {
      console.error("Error updating user:", err);
      res.status(400).json({ error: "Failed to update Pass" });
  }
};
  module.exports = {createUser,loginUser,getAllUsers,getUser,delUser,updateUser,signOut,getBookingDetails,getPassingDetails,getAllPasses,updatePass}
