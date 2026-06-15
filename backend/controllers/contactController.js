const Contact = require("../models/contact");
const Complain = require("../models/Complain")

// Create a new contact
createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
};

// Get all contacts
getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting contacts', error: error.message });
  }
};

const delContact=async(req,res)=>{
  try{
    const nBus = await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(nBus)
  }
  catch(err){
    res.status(400).json({"error":err})
  }
}

createComplain = async (req, res) => {
  try {
    const newContact = new Complain(req.body);
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
};

getAllComplains = async (req, res) => {
  try {
    const contacts = await Complain.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting complains', error: error.message });
  }
};


const delComplain=async(req,res)=>{
  try{
    const nBus = await Complain.deleteOne({_id:req.params.id});
    res.status(200).json(nBus)
  }
  catch(err){
    res.status(400).json({"error":err})
  }
}

module.exports ={createContact,getAllContacts,delContact,createComplain,getAllComplains,delComplain}