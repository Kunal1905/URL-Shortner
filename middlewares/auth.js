const { getUser } = require("../services/auth")

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    
    if(!userUid) {

        console.log("No userUid found in cookies")    
        return res.redirect("/login")
    }
    const user = getUser(userUid)
    console.log("User found:", user);

    if(!user) {
        console.log("No user found for uid:", userUid);
     return res.redirect("/login")
    }    
        req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly
}