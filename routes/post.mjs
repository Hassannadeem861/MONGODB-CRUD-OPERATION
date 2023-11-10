import express from "express";
import { nanoid } from "nanoid";
import { client } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

//Create a database
const db = client.db("cruddb");
//Create a Collection
const col = db.collection("posts");

const router = express.Router();

//Not recommened methode
//post store variable
const posts = [
  {
    id: nanoid(),
    // id: 741883,
    title: "Hassan Nadeem",
    text: "Hello I am called Hassan and I am student of SMIT and I work mern stack developer",
  },
];

// console.log("posts: ", posts);
 
// POST /api/v1/post
//single Post Get
router.post("/post", async (req, res, next) => {
  //Self Documented Api
  //Confused
  if (!req.body.title || !req.body.text) {
    res.status(403);
    res.send(`required parameters missing, 
      example request body:
      {
          title: "abc post title",
          text: "some post text"
      } `);
    return;
  }

  try {
    // Create a new document
    // Insert the document into the specified collection
    const insertResponce = await col.insertOne({
      // _id: '2323293829328320983203920
      // id: nanoid(),
      title: req.body.title,
      text: req.body.text,
      createdOn: new Date()
    });
    console.log("insertResponce: ", insertResponce);
    res.send({
      message: 'Post Created'
    })
  } catch (error) {
    console.log("error inserting mongodb: ", error);
    res.status(500).send({
      message: "server error please try later",
    });
  }

  // posts.unshift({
  //   id: nanoid(),
  //   title: req.body.title,
  //   text: req.body.text,
  // });

  // res.send({
  //   message: "Post Created",
  // });
});

// GET /api/v1/posts/:userId
//Multipal Posts Get
//Confused
router.get("/posts", async (req, res, next) => {
  const cursor = col.find({}).sort({_id: -1}).limit(50);
  try {
    let result = await cursor.toArray();
    // console.log('cursor: ', cursor)
    console.log("result: ", result);

    res.send(result);
  } catch (error) {
    console.log("error inserting mongodb: ", error);
    res.status(500).send({
      message: "server error please try later",
    });
  }
});

// GET /api/v1/post/:userId/:postId
//Single Post Get
//Confused

router.get("/post/:postId", async (req, res, next) => {
  // if (!req.params.postId) {
  //   res
  //     .status(403)
  //     .send(
  //       `post id must be a valid number, no alphabet is allowed in post id`
  //     );
  // }

  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send(`Invalid Post id`);
    return;
  }

  // const cursor = col.findOne({_id: new ObjectId(req.params.postId) });
  try {
    let result = await col.findOne({ _id: new ObjectId(req.params.postId) });
    // console.log('cursor: ', cursor)
    console.log("result: ", result);
    res.send(result);
  } catch (error) {
    console.log("error inserting mongodb: ", error);
    res.status(500).send({
      message: "server error please try later",
    });
  }

  // for (let i = 0; i < posts.length; i++) {
  //   if (posts[i].id === req.params.postId) {
  //     res.send(posts[i]);
  //     return;
  //   }
  // }

  res.send("Post not found with id " + req.params.postId);
});

// PUT /api/v1/post/:postId
//single Post Edit
// router.put("/post/:postId", async (req, res, next) => {
//   if (!ObjectId.isValid(req.params.postId)) {
//     res.status(403).send(`Invalid Post id`);
//     return;
//   }

//   if (!req.body.text && !req.body.title) { 
//     res.status(403)
//       .send(`required parameter missing, atleast one key is required,
//     example put body: 
//       PUT     /api/v1/post/:postId
//       {
//           title: "updated title",
//           text: "updated text"
//       }
//       `);
//   }

//   const dataToBeUpdated = {};
//   // {(req.params.title) ? "dataToBeUpdated.title = req.params.title" : null}
//   // {(req.params.text) ? "dataToBeUpdated.text = req.params.text" : null}

//   if (req.params.title) {
//     dataToBeUpdated.title = req.params.title;
//   }
//   if (req.params.text) {
//     dataToBeUpdated.text = req.params.text;
//   }

//   try {
//     // Insert the document into the specified collection
//     const updateResponse = await col.updateOne(
//       {
//         _id: new ObjectId(req.params.postId),
//       },
//       {
//         $set: dataToBeUpdated, 
//       }
//     );
//     console.log("updateResponse: ", updateResponse);

//     res.send({message: "Post Updated"})
//   } catch (error) {
//     console.log("error inserting mongodb: ", error);
//     res.status(500).send({
//       message: "server error please try later",
//     });
//   }

//   // for (let i = 0; i < posts.length; i++) {
//   //   if (posts[i].id === req.params.postId) {
//   //     posts[i] = {
//   //       text: req.body.text,
//   //       title: req.body.title,
//   //     };
//   //     res.send("post updated with id " + req.params.postId);
//   //     return;
//   //   }
//   // }
//   // res.send("post not found with id " + req.params.postId);
// });

//    //Self documented Api
//    if (!req.params.postId
//     || !req.body.text
//     || !req.body.title) {
//     res.status(403).send(`example put body:
//     PUT     /api/v1/post/:postId
//     {
//         title: "updated title",
//         text: "updated text"
//     }
//     `)
// }

// for (let i = 0; i < posts.length; i++) {
//     if (posts[i].id === req.params.postId) {
//         posts[i] = {
//             text: req.body.text,
//             title: req.body.title,
//         }
//         res.send('post updated with id ' + req.params.postId);
//         return;
//     }
// }
// res.send('post not found with id ' + req.params.postId);



router.put('/post/:postId', async (req, res, next) => {

  if (!ObjectId.isValid(req.params.postId)) {
      res.status(403).send(`Invalid post id`);
      return;
  }

  if (!req.body.text
      && !req.body.title) {
      res.status(403).send(`required parameter missing, atleast one key is required.
      example put body: 
      PUT     /api/v1/post/:postId
      {
          title: "updated title",
          text: "updated text"
      }
      `)
  }

  let dataToBeUpdated = {};

  if (req.body.title) { dataToBeUpdated.title = req.body.title }
  if (req.body.text) { dataToBeUpdated.text = req.body.text }


  try {
      const updateResponse = await col.updateOne(
          {
              _id: new ObjectId(req.params.postId)
          },
          {
              $set: dataToBeUpdated
          });
      console.log("updateResponse: ", updateResponse);

      res.send('post updated');
  } catch (e) {
      console.log("error inserting mongodb: ", e);
      res.status(500).send('server error, please try later');
  }
})


//DELETE REQUEST
// DELETE /api/v1/post/:userId/:postId
//single Post Delete
router.delete("/post/:postId", async(req, res, next) => {
  // if (!req.params.postId) {
  //   res.status(403).send(`post id must be a valid id`);
  // }

  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send(`Invalid Post id`);
    return;
  }

  try {
    // Insert the document into the specified collection
    const deleteResponse = await col.deleteOne(
      {
        _id: new ObjectId(req.params.postId),
      });
    console.log("deleteResponse: ", deleteResponse);

    res.send({message: "Post Deleted"})
  } catch (error) {
    console.log("error inserting mongodb: ", error);
    res.status(500).send({
      message: "server error please try later",
    });
  }



  // for (let i = 0; i < posts.length; i++) {
  //   if (posts[i].id === req.params.postId) {
  //     res.send(posts[i]);
  //     posts.splice(i, 1);
  //     res.send({ message: "Post Deleted With Id" });
  //     return;
  //   }
  // }

  // res.send("Post not found with id " + req.params.postId);
});

export default router;
