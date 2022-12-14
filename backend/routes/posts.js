const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { request } = require("express");




//get 2 last post (recent post)
router.get("/lasts" , async(req,res) => {
  try{
      const posts = await Post.find({}).sort({ createdAt: -1 }).limit(2)
      res.status(200).json(posts); 
  }catch(err){
      res.status(500).json(err);
  }
});

//create post
router.post('/', async(req,res) => {
    const newPost = new Post(req.body);
    try{
         const savedPost = await newPost.save();
         res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})


//upadte post
router.put('/:id', async (req,res) => {
     try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try{
               const updatePost = await Post.findByIdAndUpdate(req.params.id , {$set:req.body}, {new :true});
               res.status(200).json(updatePost);
            }
            catch(err){
              res.status(500).json(err)
            }
        }
        else{
            res.status(401).json("you can update only your post")
        }
     }
     catch(err){
         res.status(500).json(err);
     }
})


//delete post
router.delete("/:id", async (req ,res) =>{
    try{
     const post  = await Post.findById(req.params.id)
    if(post.username === req.body.username){
        try{
          await post.delete();
          res.status(200).json("post has been deleted..")
        }catch(err){
          res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("you can delete only you post..")
    }
    }catch(err){
        res.status(500).json(err);
    }
})

//get one post
router.get("/:id", async(req,res) =>{
      try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
      }catch(err){
          res.status(500).json(err);
      }
})

// // get all posts & pagantion 
router.get("/", async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit =  req.query.limit * 1 || 8
    const skip = (page - 1) * limit;
    const categories = req.query.categories
    const username = req.query.username

    if(categories){
        try {
            const  posts = await Post.find({categories}).skip(skip).limit(limit)
              const count = await Post.countDocuments({categories})
              const pages = Math.ceil(count / limit)
            res.json({
                pages :  pages ,
                status: 'success',
                result: posts.length,
                data: posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }else if (username){
        try {
            const  posts = await Post.find({username}).skip(skip).limit(limit)
            const count = await Post.countDocuments({username})
            const pages = Math.ceil(count / limit)
            res.json({
                pages :  pages ,
                status: 'success',
                result: posts.length,
                data: posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } 
    else {
        try {
            const  posts = await Post.find().skip(skip).limit(limit)
            const count = await Post.countDocuments()
            const pages = Math.ceil(count / limit)
            res.json({
                pages :  pages ,
                status: 'success',
                result: posts.length,
                data: posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

  })


//delete all posts 
  router.delete("/", async (req ,res) =>{
      Post.deleteMany({}).then(function(){
      console.log("Data deleted"); // Success
  }).catch(function(error){
      console.log(error); // Failure
  });
})

module.exports = router;