console.log("CRUD OPERATION WITH MONGODB");
//What is Rest Api

import express from "express";
// import cors from 'cors'
import path from "path";
const __dirname = path.resolve();
import authRouter from "./routes/auth.mjs";
import commentRouter from "./routes/comment.mjs";
import postRouter from "./routes/post.mjs";
import feedRouter from "./routes/feed.mjs";
// import {a,b} from "./routes/auth.mjs";

//server Starting Point
//init App
const app = express();
// app.use(cors())
app.use(express.json()); //body Parser and MiddleWare Function

///api/v1/login
app.use("/api/v1", authRouter);

//Ak Standard/Classic Express ki server Asa hi Hota hain
//Middle Were Function
app.use((req, res, next) => {  //JWT
  const token = "valid";
  if (token === "valid") {
    next();
  } else {
    res.send({
      message: "Invalid Token",
    });
  }
});

// app.use('/api/v1', commentRouter)
app.use("/api/v1", postRouter); //Secure Apis
// app.use('/api/v1', feedRouter)


//                 /public/index.html
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Example Server listening on Port ${PORT}`);
});
