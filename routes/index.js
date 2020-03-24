/*
* GET home page.
*/

module.exports={
    index: (req, res) => {
        res.render('index.ejs', {
            title: 'Welcome to Vision Computers',
            username:req.session.user,
            req:req
        });
    }
}
