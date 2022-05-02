const Admin = require('../models/administration');

module.exports = (req,res,next)=>{

    Admin.findById(req.session.userID,(err,user)=>{
        if(err || !user){
            return res.redirect('/login');
        }else if(user.role == 'pending' || user.confirmation == false){
            return res.redirect('/profile');
        }
        next();
    })
}
