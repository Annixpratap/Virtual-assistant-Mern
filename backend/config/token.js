import jwt from "jsonwebtoken"
const genToken = async(UserId) =>{
    try {
      const payload = { id: UserId };  
    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",  
    };

    const token = jwt.sign(payload, secret, options);
    return token;
    } catch (error) {
       console.log(error) 
       throw error;
        
    }
}

export default genToken