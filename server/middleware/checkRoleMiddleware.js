const jwt= require('jsonwebtoken')
const {User, Basket} = require('../models/models');


module.exports = function (role)
{
    return module.exports = function (req, res, next){
        if(req.method === "OPTIONS")
        {
            return next();

        }
        try{
            const token = req.headers.authorization.split(' ')[1] //Bearer asfafasf
            if(!token)
            {
                return res.status(401).json({message: "Not authorized"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role)
            {
              return res.status(403).json({message: "No access"})
            }

            req.user = decoded;
            next()

        }
        catch(e){
           res.status(401).json({message: 'Not authorized'})

        }
    };
}

