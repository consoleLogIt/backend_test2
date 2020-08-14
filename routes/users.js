const express  = require('express');
const router = express.Router();
const passport  = require('passport');

const userController = require('../controllers/user_controller');
const loginPageController = require('../controllers/login_page_controller')


router.get('/homepage',passport.checkAuthentication,userController.homepage);
router.post('/update/:id',userController.update);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),loginPageController.create_session);


module.exports = router;