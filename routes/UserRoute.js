import express from "express";
import {
    getUsers,
    getUsersByEmail,
    createUsers,
    updateUsers,
    deleteUsers
} from "../controllers/Users.js";


const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:email", getUsersByEmail);
router.post("/users", createUsers);
router.patch("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

export default router;