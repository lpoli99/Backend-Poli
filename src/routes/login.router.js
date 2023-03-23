import { Router } from "express"
import userValidation from "../middleware/userValidation.js"
import {UserManagerMongo} from "../Daos/UserManagerMongo.js"
import { createHash, isValidPassword } from "../utils/bcrypt.js"
import passport from "passport"
const router = Router()

// client id: Iv1.028bde0c8c884387
// secret client: dd8743a22e76114f0f90bd0a2e92eaec4550ef85

const userManager = new UserManagerMongo

router.get('/login', (req, res) =>{
    res.render('login')
})

router.get('/register', (req, res) =>{
    res.render('register')
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/faillogin'}), async (req,res) =>{
    const {password, username} = req.body
    try {
        if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = username
            req.session.admin = false
            req.session.usuario = true
            console.log('You are a admin!')
            res.redirect('http://localhost:8080/products')
        }else{
            req.session.user = username
            req.session.admin = true
            req.session.usuario = false
            console.log('You are already a user')
            res.redirect('http://localhost:8080/products')
        }
    } catch (error) {
        console.log(error)
    }    
})

router.get('/faillogin', (req, res)=>{
    res.status(401).send({status: 'error', message: 'Login failed!'})
})

router.post('/register', userValidation, passport.authenticate('register', {failureRedirect: '/auth/failregister'}), async (req, res)=>{

    try {
        
        res.redirect('http://localhost:8080/auth/login')
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy(err => {
            if(!err) res.redirect('http://localhost:8080/auth/login')
            else res.send({status:'Logout error!', message: err})
        })
    } catch (error) {
        console.log(error)
    }
})

router.get ('/failregister', (req, res) =>{
    res.status(401).send({status: 'error', message: 'Register failed!'})
})

router.get('/github', passport.authenticate('github', {scope: ['user: email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
    console.log('req: ', req.user)
    req.session.user = req.user.first_name
    req.session.admin = false
    req.session.usuario = true
    res.redirect('http://localhost:8080/products')
})


export default router