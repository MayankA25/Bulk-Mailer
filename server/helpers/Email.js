import nodemailer from "nodemailer"


export const getTransporter = async(userEmail, accessToken, refreshToken)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587, // was not able to send mail to organization before without this port
        secure: true, // without this also.
        auth: {
            type: "OAuth2",
            user: userEmail,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            accessToken: accessToken,
            refreshToken: refreshToken
        },
        pool: true,
        maxConnections: 5,
        rateLimit: 5
    });

    return transporter
};


export const sendMail = async(loggedInEmail, accessToken, refreshToken, recipient, subject, message)=>{
    const transporter = await getTransporter(loggedInEmail, accessToken, refreshToken);
    console.log(loggedInEmail, accessToken, recipient, subject, message)
    // console.log(recipients.join(","))
    let mailOptions = {
        from: loggedInEmail,
        to: recipient,
        subject: subject,
        html: message
    }

    console.log("Email Sent To: ", recipient);

    try{

        let info = await transporter.sendMail(mailOptions);
        console.log("Enail Sent Successfully!")

    }catch(e){
        console.log(e)
        console.log("Error While Sending Mail...")
    }
}