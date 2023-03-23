import passport from "passport"
import GithubStrategy from 'passport-github2'
import local from "passport-local"
import {UserManagerMongo} from "../Daos/UserManagerMongo.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import userModel from "../models/users.model.js"

const localStrategy = local.Strategy
const userManager = new UserManagerMongo

export const initPassport = () => {

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done)=>{
        try {
            let user = await userModel.findById(id)
            done(null, user)
        } catch (error) {
            console.log(error)
            done(error)
        }
        
    })

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.028bde0c8c884387',
        clientSecret: 'dd8743a22e76114f0f90bd0a2e92eaec4550ef85',
        callbackURL: 'http://localhost:8080/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        console.log('accessToken: ', accessToken)
        console.log('refreshToken: ', refreshToken)
        console.log('Profile: ', profile)
        try {
            let user = await userModel.findOne({email: profile._json.email})
            console.log(profile._json.email)
            if (!user) {
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    age: 18,
                    role: 'user',
                    email: profile._json.email,
                    password: '1234',
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } 
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('login', new localStrategy(
        {usernameField: 'email'},
        async (username, password, done) => {
            console.log('Passport Login')
            try {
                let user = await userManager.getUser(username)
                if (!user) {
                    console.log('User does not exist!')
                    return done(null, false)
                }

                if(!isValidPassword(user, password)){
                    console.log('Invalid data!')
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                console.log(error)
                return done(error)
            }
        }
    ))
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done)=>{
            const {first_name, last_name, age, role = 'user', email} = req.body
            let user = {first_name, last_name, age, role, email, password: createHash(password)}
            console.log('username: ', username)
            console.log('password: ', password)
            try {
                let exist = await userManager.getUser(username)
                if(exist) {
                    console.log('User already exist!')
                    return done(null, false)
                }else{
                    console.log('User succesfully created!')
                    let result = await userManager.addUser(user)
                    return done(null, result)
                }
            } catch (error) {
                console.log(error)
                return done('Could not get user' + error)
            }
        }
    ))
}
