import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AddressRoute from "./routes/AddressRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
dotenv.config();

const port = process.env.PORT || 5000
const app = express();

app.use(cookieParser());

(async () => {
    await db.sync()
})()

app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        sameSite: "none"
    }
}))
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     // cookie: {
//     //     secure: false,
//     //     sameSite: "none"
//     // }
// }))
app.use(cors({
    origin: ["http://localhost:3000", "https://safaaat.github.io"],
    credentials: true
}));
app.use(express.json()); // Agar bisa menerima data dengan format json

// // Route
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
app.use(AddressRoute);

app.listen(port, () => console.log(`Server Running ${port}`));