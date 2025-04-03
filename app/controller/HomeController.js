


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
    
    async aboutPage(req, res) {
        try {
            res.render('about')
        } catch (error) {
            console.log(error);
            
        }
    }

    blogPage(req, res) {
        res.send('BLOG PAGE')
    }
}



module.exports=new HomeController()