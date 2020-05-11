const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('auth-token')

    //Check For Token
    if(!token) return res.status(401).json({msg:"No Token"})

    try{
        const verifytoken = jwt.verify(token,process.env.token_secret)

    //Add user form payload
    req.user = verifytoken
    next()
    }
    catch{
        res.status(401).send('Invalid Token')
    }

}
module.exports = auth;