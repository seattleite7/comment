var express = require('express');
var router = express.Router();

          var mongoose = require('mongoose');
          mongoose.connect('mongodb://localhost/commentDBX2');
          var commentSchema = mongoose.Schema( {
             SimpleId: Number,
             Name: String,
            Comment: String,
            Val: Number
          });

          var Comment = mongoose.model('Comment', commentSchema);
          var dbx = mongoose.connection;
          dbx.on('error', console.error.bind(console, 'connection error:'));
          dbx.once('open', function() {
           console.log('Connected');
          });



var idCount = 0;

router.post('/comment', function(req, res, next) { console.log("POST comment route"); //[1] res.sendStatus(200); });
   var newcomment = new Comment(req.body);
   idCount = idCount + 1;
   newcomment.SimpleId = idCount;
   newcomment.Val = 0;
   console.log(newcomment);
   newcomment.save(function (err, post) {
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
   });
});

router.get('/comment', function(req, res, next) {
   console.log("in the GET route");
   Comment.find(function(err, commentList) {
      if (err) return console.error(err);
      else {
         res.send(200, commentList);
       
      }

   });

});

router.post('/vote', function(req, res, next) {

   console.log("in VOTE");
   console.log(req.body);
   var id = req.body.id;
   console.log(id);
   var query = { "SimpleId": id};
   if (req.body.up == "Y")
      {
   Comment.findOneAndUpdate( query, { $inc: {Val : 1} }, {new: true}, function(err, doc) {
         console.log("made it");
         console.log(doc);
         res.sendStatus(200);
    } );

      }
   else
     {

   Comment.findOneAndUpdate( query, { $inc: {Val : -1} }, {new: true}, function(err, doc) {
         console.log("made it");
         console.log(doc);
         res.sendStatus(200);
    } );




     } 
   
   
   
   
});




module.exports = router;
