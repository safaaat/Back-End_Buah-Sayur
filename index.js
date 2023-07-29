import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
import cookieParser from "cookie-parser";
import Users from "./models/UserModel.js";
import argon2 from "argon2";
dotenv.config();

const port = process.env.PORT || 5000
const app = express();
(async () => {
    // await db.sync()
})()

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     secure: false
    // }
}))
app.use(cors({
    origin: ["http://localhost:3000", "https://safaaat.github.io"],
    credentials: true
}));
app.use(express.json()); // Agar bisa menerima data dengan format json

// // Route
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

app.listen(port, () => console.log(`Server Running ${port}`));



// app.post("/login", async (req, res) => {
//     // Destructuring Request Body
//     const { email, password } = req.body;

//     // Query Users By Email
//     const user = await Users.findOne({
//         where: {
//             email: email
//         }
//     });

//     // If Users Doesn't Exist
//     if (!user) return res.status(400).json({ message: "email yang anda masukan tidak terdafatar" });
//     // Matching UserPassword With RequestPasswordBody Using Argon2
//     const match = await argon2.verify(user.password, password);
//     // If Password Is Not Same Return 400
//     if (!match) return res.status(400).json({ message: "password yang anda masukan salah" });

//     req.session.userId = user.uuid;

//     const userNoPass = await Users.findOne({
//         attributes: ["id", "uuid", "email"],
//         where: {
//             email: email
//         }
//     });

//     console.log(req.session)
//     res.status(200).json(userNoPass);
// });

// app.get("/me", async (req, res) => {
//     console.log(req.session.userId)
//     if (!req.session.userId) {
//         return res.status(401).json({ message: "mohon login ke akun anda!" });
//     }
//     const userNoPass = await Users.findOne({
//         attributes: ["uuid", "email", "role"],
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if (!userNoPass) return res.status(404).json({ message: "user tidak di temukan" });
//     res.status(200).json(userNoPass);
// });

// app.listen(port, () => console.log(`Server Running ${port}`));