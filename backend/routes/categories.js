const router = require("express").Router();
const Category = require("../models/Category");
const User = require("../models/User");

// create categories
router.post("/", async(req, res) =>{
    const newCat = new Category(req.body)
    try{
     const savedCat = await newCat.save();
     res.status(200).json(savedCat);    
    }
    catch(err){
        res.status(500).json(err)
    }
})

// get all categories
router.get("/" , async(req,res) => {
    try{
        const cats = await Category.find();
        res.status(200).json(cats); 
    }catch(err){
        res.status(500).json(err);
    }
});

//delete on 
router.delete("/:name", async (req ,res) =>{
        try{
          await Category.deleteOne({name : req.params.name});
          res.status(200).json("cats has been deleted..")
        }catch(err){
          res.status(500).json(err);
        }
})

//delete all posts 
router.delete("/", async (req ,res) =>{
    Category.deleteMany({}).then(function(){
    console.log("Data deleted"); // Success
}).catch(function(error){
    console.log(error); // Failure
});
})


module.exports = router;