var jwt = require('jsonwebtoken');

const JWT_SECRET =  "myname$mona";



const fetchemp=(req, res, next)=>{
// Get the user from jwt token abd add id to req
   
    const token = req.header('auth-token');
    if(!token){
     res.status(401).send({error: "Plase authenticate with valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.login = data.login;
        next();
    } catch (error) {
       res.status(401).send({error: "Plase authenticate with valid token"}) 
    }
   
}
module.exports = fetchemp;