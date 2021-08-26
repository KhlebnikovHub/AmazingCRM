
const checkSuper = async (req, res, next) => {
  if (req.session?.passport?.user?.moderator === 'true') {
    console.log('Suuuuuuuuuuuuper MODERATOR');
    return next();
  } 
  console.log('Гость НЕ ПРОПУУУУУУУУУУУУУУЩЩЩЩЩЩЩЕННННННННННННННННННННННННННННННННННННННННННННННННННННН')
  return res.redirect('/');
};

module.exports = {
  checkSuper
};
