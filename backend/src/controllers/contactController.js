import Contact from "../models/Contact.js";

const getAllContacts = async (req,res)=>{
    const contacts = await Contact.find();

    res.json(contacts);
};

const createContact = async (req,res)=>{
    const contact = await Contact.create(req.body);

    res.status(201).json(contact);
};

const deleteContact = async (req,res)=>{
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted successfully"
    });
};

export {getAllContacts, createContact, deleteContact};