export const callback = (req, res)=>{
    console.log(req.session)
    // return res.status(200).json({ msg: "Logged In Successfully", login: true })
    return res.redirect(process.env.NODE_ENV === "development" ? "http://localhost:5173/sendmail" : "/sendmail")
}

export const getUser = (req, res)=>{
    if(req.session.passport){

        const user = req.session.passport.user.user
        // console.log(user);
        return res.status(200).json({ user })
    }
    else{
        return res.status(200).json({ user: null })
    }
}

// export const checkLogin = (req, res)=>{

// }

export const logout = async (req, res)=>{
    try{
        if(req.session){
            req.session.destroy();
        }
        return res.status(200).json({ msg: "Logged Out Successfully" })
    }catch(e){
        // console.log(e)
        return res.status(400).json({ msg: "Internal Server Error" })
    }
}