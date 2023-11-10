
//MINI ROUTER
//mana apni application ki ak part Alag kar dya
//Ak file sai default export ak hi ho sakta hain do nahi ho sakta
import express from 'express'
const router = express.Router()
// export const a = express.router()
// export const b = express.router()

//Login Route
router.post("/login", (req, res, next) => {
    console.log("This is login", new Date());
    res.send({
      message: "This is login",
    });
  });
  
  //Signup Route
  router.post("/signup", (req, res, next) => {
    console.log("This is signup", new Date());
    res.send({
      message: "This is signup",
    });
  });

  export default router