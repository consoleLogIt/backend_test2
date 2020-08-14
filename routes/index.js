const express = require("express");
const passport  = require('passport');
const login_page_controller  = require('../controllers/login_page_controller');
const router = express.Router();


router.get('/',login_page_controller.login_page);

router.post('/create-user', login_page_controller.create_user);

router.post('/create-session',passport.authenticate('local', {
    failureRedirect:'/'}),login_page_controller.create_session);
    
router.get('/sign-out',login_page_controller.sign_out);

    router.use('/users', require('./users'));
module.exports = router;