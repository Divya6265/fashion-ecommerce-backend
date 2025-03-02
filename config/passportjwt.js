const passport = require("passport")
var jwtStratergy = require("passport-jwt").Strategy, Extracttoken = require("passport-jwt").ExtractJwt
const Users = require("../model/users")

passport.use( new jwtStratergy({
    jwtFromRequest : Extracttoken.fromAuthHeaderAsBearerToken(),
    secretOrKey : "code"
}, (jwtpayload, done) => {
    Users.findById(jwtpayload.id).then((user)=>{
       if(!user){
        return done(null, false)
       }
       return done(null, user)
    }).catch(err => {
        return done(err)
    })
} ))

passport.serializeUser((user, done)=> {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Users.findById(id).then(user => {
        if(!user){
            return done(null, user)
        }
        return done(null, false)
    }).catch(err => {
        return done(err)
    })
})

module.exports = passport