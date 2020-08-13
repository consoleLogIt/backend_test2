const express = require("express");
const login_page_controller  = require('../controller/login_page_controller');
const router = express.Router();


router.get('/',login_page_controller.login);

module.exports = router;