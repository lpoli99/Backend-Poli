import { Router } from "express"
import userValidation from "../middleware/userValidation.js"
import passport from "passport"
import LoginController from "../controllers/loginController.js"

const router = Router()

const loginController = new LoginController

// client id: Iv1.028bde0c8c884387
// secret client: dd8743a22e76114f0f90bd0a2e92eaec4550ef85



router.get('/login', loginController.loginRender)

router.get('/register', loginController.registerRender)

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/faillogin'}), loginController.loginVoid)

router.get('/faillogin', loginController.failLoginRender)

router.post('/register', userValidation, passport.authenticate('register', {failureRedirect: '/auth/failregister'}), loginController.registerVoid)

router.post('/logout', loginController.logoutVoid)

router.get ('/failregister', loginController.failRegisterRender)

router.get('/github', passport.authenticate('github', {scope: ['user: email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), loginController.githubcallback)

export default router