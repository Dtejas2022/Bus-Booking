const Upost =require("../models/blogModel");
const fs = require("fs");
const path =require("path");


const createBlog = async(req,res)=>{
 
    try{
      const user_id=req.uid
      console.log("user id from route is",user_id)
        const newPost=new Upost ({title:req.body.title,imageName:req.file.filename,description:req.body.description,user:req.r_user._id})
        await newPost.save()
        console.log("new post added")
        res.json({mesg:"success"})
 
 
 
 
    }
    catch(error){
        console.log("error while adding a blog",error)
 
    }
 
}

const getAllBlogs=async(req,res)=>{
    try{
    const all_post=await Upost.find({}).populate("user");
    res.status(200).json(all_post)
    }
    catch(error){
        console.log("error while getting all user posts",error)
    }

}

const delBlog=async(req,res)=>{
    try{
    const delPost = await Upost.deleteOne({_id:req.params.id})
    res.status(200).json(delPost)
    }
    catch(err){
        res.status(400).json({"error":err.mesg})
    }
    
    


}

const getBlog=async(req,res)=>{
    try{
  console.log("blog id",req.params.id)
    
    const post= await Upost.findOne({_id:req.params.id}).populate("user")
    res.status(200).json(post)
    // res.json({"post":post,userid:req.r_user._id})
  
    }
    catch(err){
      res.status(400).json({"error":err.mesg})
  
    }
  }

  const updateBlog = async (req, res) => {
    const blog = await Upost.findById(req.body._id);
    console.log("blog.file",blog.imageName)
    if (blog) {
      blog.title = req.body.title || blog.title;
      blog.category = req.body.category || blog.category;
      blog.description = req.body.description || blog.description;
      // blog.startDate = req.body.startDate || blog.startDate;
      // blog.endDate = req.body.endDate || blog.endDate;
      // console.log("eventFile",path.join(__dirname ,`../../uploads/${blog.imageName}`))
      if(req?.file?.filename){
        if(blog.imageName != req.file.filename){
          fs.unlinkSync(path.join(__dirname ,`../uploads/${blog.imageName}`))
      }
      }
      blog.imageName = req?.file?.filename || blog.imageName;
      
      const updatedBlog = await blog.save();
      if (updatedBlog) {
        res.json({
          id: updatedBlog._id,
          title:updatedBlog.title,
          category: updatedBlog.category,
          description:updatedBlog.description,
  //         startDate : updatedBlog.startDate,
  // endDate : updatedBlog.endDate,
  imageName : updatedBlog.imageName,
  
  
          
  
        });
      }
    } else {
      res.status(400);
      throw new Error("Blog not found.");
    }
  };

  const approveBlog = async(req,res) =>{
try {
  const blog = await Upost.findByIdAndUpdate(req.body._id,{$set:{status:"approved"}},{new:true});

  res.status(200).json(blog)

} catch (error) {
  res.status(400).json(error)
}
  };


  const rejectBlog = async(req,res) =>{
    try {
      const blog = await Upost.findByIdAndUpdate(req.body._id,{$set:{status:"rejected"}},{new:true});
    
      res.status(200).json(blog)
    
    } catch (error) {
      res.status(400).json(error)
    }
  };

module.exports = {createBlog,getAllBlogs,delBlog,getBlog,updateBlog,approveBlog,rejectBlog}