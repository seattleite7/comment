  function upvote(id) {
    var url = "vote";

     $.ajax({
         url:url,
        type: "POST",
        data: JSON.stringify({"id" : id, "up" : "Y"}),
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
           $("#done").html(textStatus);
           }
       });

  };


  function downvote(id) {
    var url = "vote";

     $.ajax({
         url:url,
        type: "POST",
        data: JSON.stringify({"id" : id, "up" : "N"}),
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
           $("#done").html(textStatus);
           }
       });

  };



$(document).ready(function(){ 






  $("#serialize").click(function(){ 
      var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()}; 
      jobj = JSON.stringify(myobj); 
    // $("#json").text(jobj); 

     var url = "comment"; 
      $.ajax({ 
         url:url, 
        type: "POST", 
        data: jobj,
        contentType: "application/json; charset=utf-8", 
        success: function(data,textStatus) { 
           $("#done").html(textStatus);  
           } 
       });
   });

   $("#getThem").click(function() { 
      $.getJSON('comment', function(data) { 
         console.log(data);
         var everything = "<ul>";  
         for(var comment in data) { 
            com = data[comment];
            everything += "<li>Name: " + com.Name + "  ----  Comment: " + com.Comment + "  ----  " + "Popularity: " + com.Val + "    " +
                     "<button type='button'  onclick='upvote(" + com.SimpleId +  ");' id='upvote'>Like this</button>" + 
                     "<button type='button' onclick='downvote(" + com.SimpleId +  ");' id='downvote'>Dislike this</button>" + 
                      "</li>"; 
         } 
         everything += "</ul>"; $("#comments").html(everything); 

         
     }); 


   }); 
});
