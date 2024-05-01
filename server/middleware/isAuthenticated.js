import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        //console.log(token);
        if(!token){
            return res.status(401).json({message:"User is not Authenticated"})
        };
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        if(!decode){
            return res.status(401).json({message:"Invalid token"})
        };
        req.id = decode.userId;

        next();
    }catch(error){
        console.log(error);
    }
}

export default isAuthenticated;

const req = {
    id:"",
}
req.id = "jhjgdhkjljjp"