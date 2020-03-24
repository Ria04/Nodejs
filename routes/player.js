const fs = require('fs');

module.exports = {
    event1page: (req, res) => {
        res.render('event1.ejs', {
            title: 'Vision Computers'
            ,message: '',
            username:req.session.user,
            req:req
        });
    },
    course3page: (req, res) => {
        
        let courseQuery = "SELECT * FROM `courses` ";

        db.query(courseQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
                    res.render('course3.ejs', {
                    title: 'Vision Computers'
                    ,
                    data:result,
                    req:req
                });
            
        });
    },

display:(req,res)=>{
   
    let courseid=req.params.course_name
    let query=""
if(courseid==0)
{
query="SELECT * FROM `users` WHERE `status`='Y'"
}
else
{
query="SELECT u.* FROM `users` AS u INNER JOIN `enrollment` AS c ON u.id=c.id WHERE c.course_name="+courseid+""
}
db.query(query, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
            res.render('display.ejs', {
            title: 'Vision Computers'
            ,
            data:result,
            req:req
        });
    
});
    },
    history:(req,res)=>{
   
        let query=""
   
    query="SELECT * FROM `users` WHERE `status`='N'"
    
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
                res.render('history.ejs', {
                title: 'Vision Computers'
                ,
                data:result,
                req:req
            });
        
    });
        },
    


    contactpage: (req, res) => {
        res.render('contact.ejs', {
            title: 'Vision Computers'
            ,message: '',
            username:req.session.user,
            req:req
        });
    },
    course1page: (req, res) => {
        res.render('course1.ejs', {
            title: 'Vision Computers',
            username:req.session.user,
            req:req     
    });
    },
    course2page: (req, res) => {
        
            res.render('course2.ejs', {
                title: 'Vision Computers' ,
                username:req.session.user,
            req:req     
        });
    },


    
   
    enrollform:(req,res)=>{

        let userid=req.session.userId
        let courseid=req.params.course_name

        let sql = "INSERT INTO `enrollment`(id,course_name)VALUES ('"+userid+"','" +courseid+"') ";
        
        var query = db.query(sql,(err, result) =>{
            if (err) {
                return res.status(500).send('You have been enrolled');
            }
            res.redirect('/course1');

         });
       
    },

    aboutpage: (req, res) => {
        res.render('about.ejs', {
            title: 'Vision Computers'
            ,message: '',
            username:req.session.user,
            req:req
        });
    },
   

    editpage: (req, res) => {
        let username = req.params.user_name;
        
        let query = 'SELECT * FROM `users` WHERE `user_name` = "' + username + '"';

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            res.render('edit.ejs', {
                title:' Edit  user details',
                data:result,
                req:req,
                message: ''
            });
        });
    },
    edit: (req, res) => {
        var post  = req.body;

        let username = req.params.user_name;
        let fname = post.first_name;
        let lname = post.last_name;
        let address = post.address;
        let number = post.mob_no;
        let pass=post.password;


        let query = "UPDATE `users` SET `first_name` = '" + fname + "', `last_name` = '" + lname + "', `address` = '" + address + "', `mob_no` = '" + number + "' WHERE `user_name` = '" + username + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/display/0');
        });
    },


    deleteuser: (req, res) => {
        let username = req.params.user_name;
        let deleteUserQuery = 'UPDATE `users` SET `status`="N" WHERE `user_name` = "' + username + '"';

        

           
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/display/0');
                });
         
        
    },
    permanentdeleteuser: (req, res) => {
        let id = req.params.id;

        let deleteUserQuery = 'DELETE FROM `enrollment` WHERE `id` = ' + id + ';'; 
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/history/v');
                });
        let deleteUser = 'DELETE FROM `users` WHERE `id` = ' + id + ';'; 
                db.query(deleteUser, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                });
         
         
        
    },

    activate: (req, res) => {
        let username = req.params.user_name;
        let deleteUserQuery = 'UPDATE `users` SET `status`="Y" WHERE `user_name` = "' + username + '"';

        

           
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/display/0');
                });
         
        
    },
};
