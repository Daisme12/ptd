import Contact from "../models/Contact.js";

const getAllContacts = async (req,res)=>{
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);
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
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted successfully"
    });
};

export {getAllContacts, createContact, deleteContact};
