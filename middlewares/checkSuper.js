const checkSuper = async (req, res, next) => {
  if (
    req.session?.passport?.user?.moderator === 'true' ||
    req.session?.passport?.user?.admin === 'true'
  ) {
    return next();
  }
  return res.redirect('/');
};

module.exports = {
  checkSuper,
};
