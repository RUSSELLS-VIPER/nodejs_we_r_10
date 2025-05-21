


const jwt = require("jsonwebtoken")
const authEjs = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, "lhefgadgajgjgfahgfhghjasgasj", (err, data) => {
            req.user = data
            console.log(req.user);
            
            next()
        })
    } else {
        next()
    }
}

module.exports = authEjs;