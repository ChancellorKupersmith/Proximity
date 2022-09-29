const express = require('express');
const housesController = require('../controllers/housesController');

const router = express.Router();

router.get('/', housesController.getHouses, (req,res)=>{
    
    return res.status(200).json(res.locals.houses);
});

module.exports = router;