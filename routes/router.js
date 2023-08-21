const express=require('express')
const logic=require('../controllers/logic')
//const { jwtMiddleware }=require('../middlewares/routerMiddleware')

const jwtMiddleware=require('../middlewares/routerMiddleware')


//create an object for router class in express

const router=new express.Router()

// register

router.post('/bankuser/user-register',logic.register)

//login
router.post('/bankserver/user-login',logic.login)

//user-profile

router.get('/bankserver/user-profile/:acno',jwtMiddleware,logic.getProfile)

//balance get

router.get('/bankserver/user-balance/:acno',jwtMiddleware,logic.getBalance)

//money transfer

router.post('/bankserver/money-transfer',jwtMiddleware,logic.moneyTransfer)

//transaction history

router.get('/bankserver/user-transaction/:acno',jwtMiddleware,logic.history)

// delete acno
router.delete('/bankserver/user-delete/:acno',jwtMiddleware,logic.deleteAc)


//export router

module.exports=router
