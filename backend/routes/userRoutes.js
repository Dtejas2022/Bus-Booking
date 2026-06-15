const express = require('express');
const isAdmin=require('../middlewares/isAdmin')
const ensureAuthenticated= require("../middlewares/ensureAuthenticated")
const { createUser, loginUser,getAllUsers,getUser,delUser, updateUser,signOut,getBookingDetails,getPassingDetails,getAllPasses,updatePass} = require('../controllers/userController');

const router = express.Router();

router.post('/signup',createUser);

router.post('/login', loginUser);
router.get('/getallusers',getAllUsers);
router.get('/getuser/:id', getUser);
router.get("/bookingdetails/:id",getBookingDetails)
router.get("/pass/:id",getPassingDetails)
router.get("/passses",getAllPasses)


router.patch('/getuser/update/:id',updateUser)
router.patch('/updatePass/update/:id',updatePass)

router.delete('/deluser/:id',delUser);
router.get('/logout',signOut);








module.exports = router;