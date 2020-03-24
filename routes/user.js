module.exports={
signup:(req, res)=>{
   message = '';
   if(req.method == "POST"){
      //post data

   } else {
      res.render('signup.ejs');
   }
},
loginpage:(req, res)=>{
   message = '';
   if(req.method == "POST"){
      //post data

   } else {
      res.render('login.ejs');
   }
},
login:(req, res)=>{
      var message = '';
      var sess = req.session; 

      if(req.method == "POST"){
         var post  = req.body;
         var name= post.user_name;
         var pass= post.password;
   
         var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"'and`password` = '"+pass+"'";                           
         db.query(sql, function(err, results){      
            if(results){
               req.session.userId = results[0].id;
               req.session.user = results[0].user_name;
            
               console.log(results[0].id);
               res.redirect('/');
            }
            else{
               message = 'Wrong Credentials.';
               res.render('login.ejs',{message: message});
            }
                    
         });
      } else {
         res.render('login.ejs',{message: message});
      }         
},
signupform:(req, res)=>{
   
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var address=post.address;
      let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + name + "'";

      db.query(usernameQuery, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          if (result.length > 0) {
              message = 'Username already exists';
              res.render('signup.ejs', {
                  message,
                  title: 'Welcome to Visiom Computers'
              });
          }
          else{
      var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`,`address`,`status`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "','" + address + "','Y')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });
   }});
   }
    else {
      res.render('/signup');
   }
},
logout:(req, res, next)=>{
   if (req.session) {
     // delete session object
     req.session.destroy(function(err) {
       if(err) {
         return next(err);
       } else {
         return res.redirect('/');
       }
     })
 
}
}}

