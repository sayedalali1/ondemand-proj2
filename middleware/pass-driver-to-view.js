const passDriverToView = (req, res, next) => {
    res.locals.driver = req.session.driver ? req.session.driver : null
    next()
  }
  
  module.exports = passDriverToView