const express = require('express');
const {createContact,getAllContacts,delContact,createComplain,getAllComplains,delComplain} = require("../controllers/contactController")
const router = express.Router();

router.post('/createcontact', createContact); 

router.get("/getallcontacts",getAllContacts)
router.delete("/deleteContact/:id",delContact)


router.post('/createcomplain', createComplain); 

router.get("/getallcomplains",getAllComplains)
router.delete("/deleteComplain/:id",delComplain)

module.exports = router;
