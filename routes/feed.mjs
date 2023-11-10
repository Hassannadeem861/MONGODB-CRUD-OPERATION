import express from 'express'
const router = express.Router()

// FEED /api/v1/feed/:userId
//single Post feed
router.get("/feed/:userId", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "Post Created",
    });
  });

  export default router