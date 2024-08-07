const Animal = require('../models/animal');

module.exports = async function isCommentAuthor(req, res, next) {
  const animal = await Animal.findById(req.params.id);
  const comment = animal.comments.id(req.params.commentId);
  if (comment.author.equals(req.session.user._id)) {
    return next();
  } else {
    res.redirect('back');
  }
};
