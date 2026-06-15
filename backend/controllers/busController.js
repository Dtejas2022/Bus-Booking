const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel")

const Bus = require("../models/bus.js")
const Booking = require("../models/booking.js")
const Pass = require("../models/pass.js")
const createBus = async (req, res) => {
    try {
      const { vehicleName ,from,start,ticket,capacity} = req.body;
  
      // Check if username is taken
      const existingBus = await Bus.findOne({ vehicleName });
      if (existingBus) {
        return res.status(400).json({ message: 'BusName is already taken' });
      }
  
      
  
      const newUser = new Bus({
        vehicleName,from,start,ticket,capacity
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Step 4: Generate and sign JWT on successful registration
      // const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET);
  
      // Return the token
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(400).json({"error":error});
    }
  }



  const delBus=async(req,res)=>{
    try{
      const nBus = await Bus.deleteOne({_id:req.params.id});
      res.status(200).json(nBus)
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }

  
  const bookBus=async(req,res)=>{
    try{
      const {bus_id,user_id,price} = req.body
      console.log(req.body)

     
      const findBus =await  Bus.findOne({_id:bus_id})
      const findUser = await User.findOne({_id:user_id})
      if (findBus && findUser)
      
      {
        const userAmount = parseInt(findUser.amount);
        const busTicket = parseInt(findBus.ticket);
        const busCapacity = parseInt(findBus.capacity)
        if (userAmount <busTicket)
        {
          return res.status(402).send("Account Balance is low")

        }
        else if (busCapacity<1)
          {
           return res.status(402).send("full")
          }
        else{
          const newAmount= userAmount-busTicket ;
          const updatedCapacity = busCapacity - 1;

          const updatedUser = await User.findOneAndUpdate({_id:user_id},{amount:newAmount}, { new: true, })
          console.log(updatedUser)

          const newBooking = new Booking({bus_id,user_id,price});
        const book= await newBooking.save()
        // const updateBus= await Bus.updateOne({_id:bus_id},{ $push: { bookings:book._id } })
        const updateBus = await Bus.updateOne(
          { _id: bus_id },
          { $push: { bookings: book._id }, $set: { capacity: updatedCapacity } }
      );
        const updatedUser1=await User.updateOne({_id:user_id},{$push:{bookings:book._id}})
        return res.status(200).send("Boos Booked Succefully")

        

        }
        


      }
      
      return res.status(200).send("APi working")
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }

  // book pass

  const bookPass=async(req,res)=>{
      
    
    try{
      const {bus_id,user_id,price,pass} = req.body

     
      const findBus =await  Bus.findOne({_id:bus_id})
      const findUser = await User.findOne({_id:user_id})
      if (findBus && findUser)
      
      {
        const userAmount = parseInt(findUser.amount);
        const busTicket = parseInt(findBus.ticket);
        const busCapacity = parseInt(findBus.capacity)
        const isDailyPass = pass =="Daily Pass"
        const passMultiplier = isDailyPass ? 2 : 5
        const passPrice = passMultiplier * busTicket

        if (userAmount < passPrice)
        {
          return res.status(402).send("Account Balance is low")

        }
        else if (busCapacity<1)
          {
           return res.status(402).send("full")
          }
        else{
          const newAmount= userAmount-passPrice ;
          const updatedCapacity = busCapacity;

          const updatedUser = await User.findOneAndUpdate({_id:user_id},{amount:newAmount}, { new: true, })
          // console.log(updatedUser)
          if (isDailyPass)
            {
            
          const newBooking = new Pass({bus_id,user_id,price:passPrice,daily:true});
        const book= await newBooking.save()


        const updateBus = await Bus.updateOne(
          { _id: bus_id },
          { $push: { passes: book._id }, $set: { capacity: updatedCapacity } }
      );

        const updatedUser1=await User.updateOne({_id:user_id},{$push:{passes:book._id}})
        return res.status(200).send("Pass Booked Succefully")

            }
            else{
              const newBooking = new Pass({bus_id,user_id,price:passPrice,monthly:true});
              const book= await newBooking.save()

              const updateBus = await Bus.updateOne(
                { _id: bus_id },
                { $push: { passes: book._id }, $set: { capacity: updatedCapacity } }
            );
      
              const updatedUser1=await User.updateOne({_id:user_id},{$push:{passes:book._id}})
              return res.status(200).send("Pass Booked Succefully")

            }
        // const updateBus= await Bus.updateOne({_id:bus_id},{ $push: { bookings:book._id } })
       

        

        }
        


      }
      
      return res.status(200).send("APi working")
    }
    catch(err){
      res.status(400).json({"error":err})
    }
  }




//   const updateUser = async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const updateuser = { ...req.body }
//         const result1 = await User.findByIdAndUpdate(_id,updateuser,{new:true});
//         res.status(200).json(result1)

//     }

//     catch (err) {
//         res.status(400).json({"error":err});
//       }
//   }

//   const signOut= async(req,res)=>{
//     res.clearCookie('jwt');
//     res.status(200).json({"mesg":"Log out succesfully"})

//   }
const GetAllBookedbuses=async(req,res)=>{
  try{
    const user = await User.findOne({ _id: userId });
    res.status(200).json(Buses)
  }
  catch(err)
  {
    res.status(400).json({"error":err})

  }
}

const GetAllBuses=async(req,res)=>{
  try{
   const Buses = await Bus.find({})
   res.status(200).json(Buses)
  }
  catch(err)
  {
    res.status(400).json({"error":err})

  }
}
  module.exports = {createBus,delBus,GetAllBuses,bookBus,bookPass}
