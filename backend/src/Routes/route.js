const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')


router.get('/verifyToken', userController.verifyUser)


module.exports = router















