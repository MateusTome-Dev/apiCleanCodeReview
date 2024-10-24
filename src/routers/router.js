const {Router} = require('express')
const userRouter=require('./usuarioRotas')
const adminRouter=require('./adminRotas')
const router = Router();


router.use('/user',userRouter)
router.use('/admin',adminRouter)

module.exports = router