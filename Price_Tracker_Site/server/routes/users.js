const router = require('express').Router()
let user = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.route("/register").post((req,res) => {

    const userdata = {
     username :req.body.username,
     email :req.body.email,
     password : req.body.password,
    }
    const username =req.body.username
    const email =req.body.email

    //Check if Email is Already Registered
    user.findOne({email,username})
    .then(user => {
        if(user){
            return res.status(400).json({ msg:'User Already Registerd' })
        }
    })
    const newUser = new user(userdata)
    //Create salt and Hash
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) =>{
            if(err) throw err
            newUser.password = hash
            newUser.save()
            .then((user) => res.json({user:{
                id:user.id,
                name:user.name,
                email:user.email,
                
            }}))})})     
})

router.route('/login').post((req,res) => {
    const userdata = {
        username :req.body.username,
        password : req.body.password,
       }
    //Check Existing User
    user.findOne({username: userdata.username})
    .then(user =>{
        if(!user) return res.status(400).json('Not Foundd');
        
        //If user is Present Validate Password

        bcrypt.compare(userdata.password,user.password)
        .then(ismatch =>{
            if(!ismatch) return res.status(400).json('Password is Incorrect')
            
            let token = jwt.sign({id:user.id},process.env.token_secret,{expiresIn:3600})
            res.header('auth-token',token).json({token:token,user:user})
        
        })
    }
    )

})

module.exports = router;
