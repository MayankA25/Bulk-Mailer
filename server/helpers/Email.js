import nodemailer from "nodemailer"


export const getTransporter = async(userEmail, accessToken, refreshToken)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: userEmail,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });

    return transporter
};


export const sendMail = async(loggedInEmail, accessToken, refreshToken, recipients, subject, message)=>{
    const transporter = await getTransporter(loggedInEmail, accessToken, refreshToken);
    console.log(loggedInEmail, accessToken, recipients, subject, message)
    console.log(recipients.join(","))
    let mailOptions = {
        from: loggedInEmail,
        to: recipients.join(","),
        subject: subject,
        html: message
    }

    try{

        let info = await transporter.sendMail(mailOptions);
        console.log("Enail Sent Successfully!")

    }catch(e){
        console.log(e)
        console.log("Error While Sending Mail...")
    }
}