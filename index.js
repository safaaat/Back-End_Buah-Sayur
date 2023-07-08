import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import db from "./config/Database.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const port = process.env.PORT || 5000
const app = express();
(async () => {
    await db.sync()
})()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://safaaat.github.io"]
}));
app.use(express.json()); // Agar bisa menerima data dengan format json

// Route
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

app.listen(port, () => console.log(`Server Running ${port}`));