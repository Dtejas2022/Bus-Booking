const express = require('express');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const { createBus,delBus,GetAllBuses,bookBus,bookPass} = require("../controllers/busController"); // Corrected import



const router = express.Router();

router.post('/createbus', createBus); 
router.delete("/deletebus/:id",delBus)
router.get("/getallbuses",GetAllBuses)
router.post("/bookbus",bookBus)
router.post("/bookpass",bookPass)

// router.get("/bookedbuses")

module.exports = router;
