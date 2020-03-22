/*
* GET home page.
*/

module.exports={
    index: (req, res) => {
        res.render('index.ejs', {
            title: 'Welcome to Visiom Computers',
            username:req.session.user,
            req:req
        });
    }
}