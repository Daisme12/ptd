import { db } from "../config/firebase.js";

const getAllContacts = async (req, res) => {
    try {
        const snapshot = await db.collection("contacts").orderBy("createdAt", "desc").get();
        const contacts = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContact = async (req, res) => {
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

        const data = {
            fullName: fullName || name || "",
            phone: phone || "",
            email: email || "",
            service: service || "",
            requestType: requestType || "partner_consultation",
            source: source || "",
            status: status || "new",
            message: message || note || content || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await db.collection("contacts").add(data);
        const newDoc = await docRef.get();

        res.status(201).json({
            _id: newDoc.id,
            ...newDoc.data()
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const docRef = db.collection("contacts").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await docRef.delete();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllContacts, createContact, deleteContact };
