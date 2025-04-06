import { Router } from "express";
// import { sendMail } from "../helpers/Email.js";
import { checkLogin } from "../middleware/checkLogin.js";
// import {  } from "../helpers/Connection.js"
import { mailQueue } from "../helpers/Queue.js";



const mailRouter = Router();

mailRouter.use(checkLogin)

mailRouter.post("/sendmail", async (req, res)=>{
    // const { recipents, subject, message } = req.body;
    const { recipients, subject, body } = req.body;

    // console.log(recipients, subject, body);

    if(recipients.length === 0) return res.status(500).json({ msg: "Provide at least 1 email address" })
    try{
        const loggedInEmail = req.session.passport.user.user.email; 
        const accessToken = req.session.passport.user.accessToken;
        const refreshToken = req.session.passport.user.refreshToken;
        // await sendMail(loggedInEmail, accessToken, refreshToken, recipients, subject, body );
        // console.log("Email Sent Successfully")

        // await Promise.all(recipients.map((recipient)=>{
        //     mailQueue.add("sendMail", recipient, {
        //         attempts: 3,
        //         backoff: {
        //             type: "exponential",
        //             delay: 5000
        //         }
        //     })
        // }))

        for(const recipient of recipients){
            await mailQueue.add('sendMail', { loggedInEmail, accessToken, refreshToken, recipient, subject, body })
        }
        console.log("All Mails Added to the Queue")

        res.status(200).json({ msg: `Email Successfully Sent To ${recipients}`, sent: true })
    }catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Error sending mails", sent: false })
    }
})

export default mailRouter