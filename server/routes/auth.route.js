import { Router } from "express";
import { callback, getUser, logout } from "../controller/auth.controller.js";
import passport from "passport";

const authRouter = Router();

authRouter.get("/", (req, res)=>{
  res.status(200).json({ msg: "Hello World" })
})

authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://mail.google.com/"
    ],
    accessType: "offline",
    prompt: "consent",
    approval_prompt: "force",
  })
);
authRouter.get("/callback", passport.authenticate("google", {failureRedirect: "http://localhost:5173"}), callback);

authRouter.get("/getuser",getUser)

authRouter.post("/logout", logout);

// authRouter.get("/check", check)
export default authRouter;
