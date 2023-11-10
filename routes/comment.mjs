
import express from 'express'
const router = express.Router()

// GET /api/v1/comment/:postId/:commentId
//single post get comment
router.get("/comment/:postId/:commentId", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "Post Created",
    });
  });
  
  // GET /api/v1/comments/:postId
  //Multipal post get comments
  router.get("/comments/:postId", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "Post Created",
    });
  });
  
  
  // PUT /api/v1/comment/:postId/commentId
  //single Post comment Edit
  router.put("/comment/:postId/commentId", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "Post Created",
    });
  });
  
  
  // DELETE /api/v1/comment/:postId/commentId
  //single Post comment delete
  router.delete("/comment/:postId/commentId", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "Post Created",
    });
  });
  
  export default router