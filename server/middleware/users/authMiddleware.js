import jwt from "jsonwebtoken";
import config from "config"

let authMiddleware = (req,res,next) =>{
    try {
        let token = req.headers["access-token"] || req.headers["authorization"];
        // console.log(token);
        
        if(!token){
            return res.status(401).json({msg:"Please Token diyo"})
        }
        // console.log(config.get("JWTKEY"));
    
        let verify=jwt.verify(token,config.get("JWTKEY"));

        // console.log(verify);
        req.user=verify
        next();       
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"JWT Token ka time hogaya"})
    }
}

 export default authMiddleware;