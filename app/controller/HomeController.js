


class HomeController{

    async homepage(req, res) {
        try {
            res.render('index', {
                title: "home page",
                user:"pritam"
            })
            
        } catch (err) {
            console.log(err);
            
        }
    }
    
    aboutPage(req, res) {
        res.send('about page')
    }

    blogPage(req, res) {
        res.send('BLOG PAGE')
    }
}



module.exports=new HomeController()