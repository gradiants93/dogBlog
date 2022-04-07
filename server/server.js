const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("../server/db/db-connection.js");
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "build");
const app = express();
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

//creates an endpoint for the route /api
app.get("/", (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

//create the get request
app.get("/api/posts", cors(), async (req, res) => {
  try {
    const { rows: posts } = await db.query("SELECT * FROM posts");
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//create the POST request
app.post("/api/posts", cors(), async (req, res) => {
  const newPost = {
    title: req.body.title,
    textcontent: req.body.textcontent,
    photourl: req.body.photourl,
    alttext: req.body.alttext,
    category: req.body.category,
  };
  console.log([
    newPost.title,
    newPost.textcontent,
    newPost.photourl,
    newPost.alttext,
    newPost.category,
  ]);
  const result = await db.query(
    "INSERT INTO posts(title, textcontent, photourl, alttext, category) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [
      [
        newPost.title,
        newPost.textcontent,
        newPost.photourl,
        newPost.alttext,
        newPost.category,
      ],
    ]
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// delete request
app.delete("/api/posts/:postId", cors(), async (req, res) => {
  const postId = req.params.postId;
  //console.log(req.params);
  await db.query("DELETE FROM posts WHERE id=$1", [postId]);
  res.status(200).end();
});

// Put request - Update request
app.put("/api/posts/:postId", cors(), async (req, res) => {
  const postId = req.params.postId;
  const updatePost = {
    id: req.body.id,
    title: req.body.title,
    textcontent: req.body.textcontent,
    photourl: req.body.photourl,
    alttext: req.body.alttext,
    category: req.body.category,
  };
  //console.log(req.params);
  // UPDATE students SET lastname = 'TestMarch' WHERE id = 1;
  console.log(postId);
  console.log(updatePost);
  const query = `UPDATE posts SET title=$1, textcontent=$2, photourl=$3, alttext=$4, category=$5 WHERE id = ${postId} RETURNING *`;
  console.log(query);
  const values = [
    updatePost.title,
    updatePost.textcontent,
    updatePost.photourl,
    updatePost.alttext,
    updatePost.category,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
