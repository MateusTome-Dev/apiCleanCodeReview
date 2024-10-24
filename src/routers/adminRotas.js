const { Router } = require('express');
const adminController = require("../controller/adminController");
 
const router = Router();
 
router.post('/', 
    (req,res)=>{adminController.create(req,res)}
);
router.get('/',
    (req,res)=>{adminController.login(req,res)}
);
router.put('/:id',
    (req,res)=>{adminController.updatePassword(req,res)}
);
router.get('/',
    (req,res)=>{adminController.getAll(req,res)}
);
router.put('/:id',
    (req,res)=>{adminController.update(req,res)}
 );
router.delete('/:id',
    (req,res)=>{adminController.delete(req,res)}
 );
router.get('/:id',
    (req,res)=>{adminController.getOne(req,res)}
 );
 
module.exports = router;