
const express = require('express');
const bodyparser= require('body-parser')
const mongoose=require('mongoose');
const { urlencoded } = require('body-parser');
const port=3000;
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


//mongoose connection with database server
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB')
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log('mongo error',err))

//schema created
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    
    });

//model is created
 const Article = mongoose.model("Article", articleSchema);
//get request to get all data from database
 app.get('/articles', async (req, res) => {
    try {
      const users = await Article.find({},'content');
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  //post data to the database

//   app.post('/articles', async (req, res) => {
//     try {
//       const user = new Article(req.body);
//       await user.save();
//       res.send(user);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Server error');
//     }
//   });

  //delete data from database
//   app.delete('/articles', async (req, res) => {
//   Article.deleteMany({ isPublished: false }, function (err) {
//     if (err) return handleError(err);
//     // Success
//   });
// });

app.delete(function(req, res){

      Article.deleteMany(function(err){
        if (!err){
          res.send("Successfully deleted all articles.");
        } else {
          res.send(err);
        }
      });
    });


 //port 3000 listening our server side responses
app.listen(port,(req,res)=>{
    console.log('server running at localhost 3000')
})    

/////////////////////////////////////
//jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const mongoose = require('mongoose');

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(express.static("public"));

// mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

// const articleSchema = {
//   title: String,
//   content: String
// };

// const Article = mongoose.model("Article", articleSchema);




// .post(function(req, res){

//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });

//   newArticle.save(function(err){
//     if (!err){
//       res.send("Successfully added a new article.");
//     } else {
//       res.send(err);
//     }
//   });
// })

// .delete(function(req, res){

//   Article.deleteMany(function(err){
//     if (!err){
//       res.send("Successfully deleted all articles.");
//     } else {
//       res.send(err);
//     }
//   });
// });

// ////////////////////////////////Requests Targetting A Specific Article////////////////////////

// app.route("/articles/:articleTitle")

// .get(function(req, res){

//   Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
//     if (foundArticle) {
//       res.send(foundArticle);
//     } else {
//       res.send("No articles matching that title was found.");
//     }
//   });
// })

// .put(function(req, res){

//   Article.update(
//     {title: req.params.articleTitle},
//     {title: req.body.title, content: req.body.content},
//     {overwrite: true},
//     function(err){
//       if(!err){
//         res.send("Successfully updated the selected article.");
//       }
//     }
//   );
// })

// .patch(function(req, res){

//   Article.update(
//     {title: req.params.articleTitle},
//     {$set: req.body},
//     function(err){
//       if(!err){
//         res.send("Successfully updated article.");
//       } else {
//         res.send(err);
//       }
//     }
//   );
// })

// .delete(function(req, res){

//   Article.deleteOne(
//     {title: req.params.articleTitle},
//     function(err){
//       if (!err){
//         res.send("Successfully deleted the corresponding article.");
//       } else {
//         res.send(err);
//       }
//     }
//   );
// });



// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
