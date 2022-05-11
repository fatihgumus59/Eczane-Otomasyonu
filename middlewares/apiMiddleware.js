const Api = require('../models/api');

module.exports = (req, res, next) => {

    let token = req.query.api_key;
    if (token) {
        Api.findOne({ apiToken: token })
            .then(user => {

                if(user.status == true){
                    if (user) next();
                    else  next(res.status(404).send('Geçersiz API anahtarı '));   
                }else{
                    next(res.status(404).send('API anahtarı aktif değil. '));   
                }

                  
            })
            .catch(error => {
                next(res.status(404).send(`API anahtarı bulunamadı. `));  
            
            });
    } else {
        next(res.status(404).send(`API anahtarı girilmedi `));  
    
    }

}