const isSignedInDriver = (req, res, next) => {
    if (req.session.user && req.session.user.profile === 'driver')
         return next()
        res.redirect('/auth/sign-in-driver')
}

module.exports = isSignedInDriver;

