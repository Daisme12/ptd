import Contact from "../models/Contact.js";

const getAllContacts = async (req,res)=>{
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req,res)=>{
    try {
        const {
            fullName,
            name,
            phone,
            email,
            service,
            requestType,
            source,
            status,
            message,
            note,
            content
        } = req.body;

        const contact = await Contact.create({
            fullName: fullName || name,
            phone,
            email,
            service,
            requestType: requestType || "partner_consultation",
            source,
            status,
            message: message || note || content
        });

        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteContact = async (req,res)=>{
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message:"Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getAllContacts, createContact, deleteContact};
