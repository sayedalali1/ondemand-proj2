const isSignedIn = (req, res, next) => {
    if (req.session.driver) return next()
        res.redirect('/auth/sign-in-driver')
}

module.exports = isSignedIn;

