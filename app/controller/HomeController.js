


class HomeController{

    homepage(req, res) {
         res.send('home page')
    }
    
    aboutPage(req, res) {
        res.send('about page')
    }
}



module.exports=new HomeController()