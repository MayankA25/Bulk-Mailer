import passport from "passport";
import { Strategy } from "passport-google-oauth20"
import { User } from "../models/User.js";
import dotenv from "dotenv"


dotenv.config({ path: "D:\\Mayank Data\\CODING\\MERN Projects\\Bulk Mailer\\server\\.env" })



export default passport.use(new Strategy({
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === "development" ? "http://localhost:5000/api/auth/callback" : "https://bulk-mailer-0vsb.onrender.com/api/auth/callback",
    scope: ["profile",
      "email",
      "https://mail.google.com/"],
    accessType: "offline",
    prompt: "consent",
    approval_prompt: "force"
}, async (accessToken, refreshToken, profile, done)=>{
    console.log(refreshToken)
    try{

        let foundUser = await User.findOne({ email: profile.emails[0].value });
        
        if(foundUser){
            return done(null, {user:foundUser, accessToken, refreshToken})
        }
        
        let newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            userId: profile.id
        });
        
        let savedUser = await newUser.save();

        console.log(savedUser);

        return done(null, {user: savedUser, accessToken, refreshToken})
    }catch(e){
        console.log("Error in Passport...")
        return done(e, null)
    }
}));


passport.serializeUser((obj, done)=>{
    // console.log()
    return done(null, obj);
})

passport.deserializeUser(async (obj, done)=>{
    try {
        const foundUser = await User.findById(obj.user._id);
        if(!foundUser){
            throw new Error("Unauthenticated");
        }
        return done(null, foundUser);
    } catch (error) {
        return done(error, null)
    }
})