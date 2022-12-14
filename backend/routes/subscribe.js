const router = require("express").Router();
const Subscribe = require("../models/Subscribe");

// create subscibe
router.post("/", async(req, res) =>{
    const newSub = new Subscribe(req.body)
    try{
     const savedSub = await newSub.save();
     res.status(200).json(savedSub);    
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;

