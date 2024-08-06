const isSignedIn = (req, res, next) => {
  if (req.session.user && req.session) return next();
  res.redirect('/users/sign-in');
};

module.exports = isSignedIn;