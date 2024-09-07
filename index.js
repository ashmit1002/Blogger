//Initialization
import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

//Store data
let posts = [];

//Post constructor
function Post(title, content){
  this.title = title;
  this.content = content;
}

//Add post
function addPost(title, content){
  let post = new Post(title, content);
  posts.push(post);
}

//Delete post
function deletePost(index){
  posts.splice(index, 1);
}

//Edit post
function editPost(index, title, content){
  posts[index] = new Post(title, content);
}

//Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Requests

//Home page
app.get("/", (req, res) => {
  res.render("home.ejs", {
    posts: posts,
  });
});

//View post
app.get("/views/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render("views.ejs", {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

//Create page
app.get("/create", (req, res) => {
  res.render("create.ejs");
});

//Create post
app.post("/save", (req, res) => {
  console.log(req.body);
  addPost(req.body["title"], req.body["content"]);
  res.redirect("/");
});

//Edit post page
app.get("/edit/:id", (req, res) => {
  let postId = req.params.id;
  let post = posts[postId];
  res.render("create.ejs", {
    postId: postId,
    title: post.title,
    content: post.content,
  })
  console.log(req.body);
});

//Update content
app.post("/update/:id", (req, res) => {
  let postId = req.params.id;
  editPost(postId, req.body["title"], req.body["content"]);
  res.redirect("/");
});

//Delete post
app.post("/delete", (req, res) => {
  let postId = req.body["postId"];
  deletePost(postId);
  res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
    addPost("First Blog", "Hello my name is Ashmit");
    addPost("Second Blog", "My last name is Shrivastava");
});