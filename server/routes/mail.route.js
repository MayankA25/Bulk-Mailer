import { Router } from "express";
import { sendMail } from "../helpers/Email.js";
import { checkLogin } from "../middleware/checkLogin.js";


const mailRouter = Router();

mailRouter.use(checkLogin)

mailRouter.post("/sendmail", async (req, res)=>{
    // const { recipents, subject, message } = req.body;
    const { recipients, subject, body } = req.body;

    // console.log(recipients, subject, body);

    if(recipients.length === 0) return res.status(500).json({ msg: "Provide at least 1 email address" })
    try{
        await sendMail(req.session.passport.user.user.email, req.session.passport.user.accessToken, req.session.passport.user.refreshToken, recipients, subject, body );
        // console.log("Email Sent Successfully")
        res.status(200).json({ msg: `Email Successfully Sent To ${recipients}`, sent: true })
    }catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Error sending mails", sent: false })
    }
})

export default mailRouter