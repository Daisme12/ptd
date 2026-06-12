import express from "express";
import {
    getAllContacts,
    createContact,
    deleteContact
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/")
    .get(getAllContacts)
    .post(createContact);

router.route("/:id")
    .delete(deleteContact);

export default router;
