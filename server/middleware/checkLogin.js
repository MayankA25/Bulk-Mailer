export const checkLogin = async (req, res, next)=>{
    
    if(req.session.passport?.user?.accessToken){
        return next()
    }
    else{
        return res.status(401).json({ msg: "Unauthenticated" })
    }
}