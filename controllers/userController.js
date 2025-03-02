const passport = require("passport")
require("../config/db")
const Users = require("../model/users")
const {hash, compare}  = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports.createUser = (req, res) => {
    console.log(req.body)
    if(req.body.password != req.body.confirmPassword){
        return res.json({
            success : false,
            message : "password and confirm password are not matching"
        })
    }
    
    Users.findOne({email: req.body.email}).then(async (user) => {
        if(!user){
            const hashPassword = await hash(req.body.password, 10)
            Users.create({
                name : req.body.name,
                email : req.body.email,
                password : hashPassword
            }).then(user => {
                console.log(user);
                return res.json({
                    success : true,
                    message : "User Created Successfuly"
                })
            }).catch(err => {
                return res.json({
                    success: false,
                    message : "Cant create a user",
                    error : err
                })
            })
        }else{
            return res.json({
                success : true,
                message : "User already in db"
            })
        }
    }).catch(err => {
        return res.json({
            success: false,
            message : "Cant find user",
            error : err
        })
    })
}
module.exports.createSession = (req, res) => {

    console.log(req.body)
    Users.findOne({email: req.body.email}).then(async(user) => {
        console.log(user)
        const comparePassword = await compare(req.body.password, user.password)
        if(!user || !comparePassword){
            return res.json({
                success : false,
                message : "Invalid email or password"
            })
        }else{
            const payload = {
                email : user.email,
                id : user.id
            }
            const token = jwt.sign(payload, "code", {expiresIn : '1d'})

            return res.json({
                success : true,
                message : "User is Successfuly signed in",
                token : "Bearer " + token,
                user :{
                    name : user.name,
                    email : user.email
                }
            })
        }
    }).catch(err => {
        return res.json({
            success: false,
            message : "Cant find user",
            error : err
        })
    })
    
}

module.exports.profile = (req, res) => {
    console.log(req.user);
    return res.json({
        success : true,
        message : "your are Authorized",
        user : {
            name : req.user.name,
            email : req.user.email
        }
    })
}