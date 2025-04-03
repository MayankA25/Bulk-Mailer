import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose"
import session from "express-session"
import Mongo from "connect-mongo"
import passport from "passport"
import authRouter from "../routes/auth.route.js";
import googleStrategy from "../strategies/google-strategy.js";
import { checkLogin } from "../middleware/checkLogin.js";
import mailRouter from "../routes/mail.route.js";
import cors from "cors"
import path from "path"

dotenv.config({path:"D:\\Mayank Data\\CODING\\MERN Projects\\Bulk Mailer\\server\\.env"})

const __dirname = path.resolve();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To MongoDB...")
}).catch((e)=>{
    console.log("Error while connecting to MONGO DB")
    console.log(e);
})

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Auhtorization"]
}));
app.use(express.json())
app.use(session({
    secret: "thisisthesecretofexpress-session",
    resave: false,
    saveUninitialized: false,
    store: Mongo.create({
        client: mongoose.connection.getClient()
    }),
    cookie: {
        maxAge: 60000 * 60,
        secure: false,
        httpOnly: true
    }
}))
app.use(passport.initialize())
app.use(passport.session())


const PORT = process.env.PORT

app.use("/api/auth", authRouter)

// app.use(checkLogin)

// app.use("/", (req, res)=>{
//     console.log(req.session)
//     return res.status(200).json({ msg: "Hello World!" })
// })

app.use("/api/mail", mailRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client", "dist")));
    app.use("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}


app.listen(PORT, ()=>{
    console.log("Listening On The PORT: ", PORT)
})