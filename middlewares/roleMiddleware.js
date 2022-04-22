module.exports = (roles) => {

    return (req, res, next) => {
        const userRole = req.body.role;
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(404).send('Hatalı Erişim');
        }

    }

}