const express = require('express');
const { createBlog, getAllBlogs,delBlog,getBlog,updateBlog,approveBlog,rejectBlog} = require('../controllers/blogController.js');
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated.js")
const isAdmin = require("../middlewares/isAdmin.js")

const router = express.Router();

const multer  = require('multer');

const storage = multer.diskStorage({destination: (req, file, cb) => {
    cb(null, 'uploads/')},filename:(req,file,next)=>{
 next(null,Date.now() + '-' + file.originalname)
}})
  
  const upload = multer({storage: storage})

// router.post("/createBlog",upload.single('image'),createBlog);
router.post("/addblog",ensureAuthenticated,upload.single("img"),createBlog)


router.get("/getallblogs",ensureAuthenticated,getAllBlogs);

router.delete("/delblog/:id",ensureAuthenticated,delBlog);

router.route("/update-blog").put(ensureAuthenticated,multer({

  storage: multer.diskStorage({

    destination: function (req, file, cb) {

      cb(null, "uploads");

    },

    filename: function (req, file, cb) {

      cb(null, file.originalname );

    },

  }),

}).single("img"),updateBlog);

router.get("/blog/:id",ensureAuthenticated,getBlog);

router.post("/approve",ensureAuthenticated,isAdmin,approveBlog);

router.post("/reject",ensureAuthenticated,isAdmin,rejectBlog)

module.exports = router