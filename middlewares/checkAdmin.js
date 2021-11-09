
const checkAdmin = async (req, res, next) => {
  if (req.session?.passport?.user?.admin === 'true') {
    console.log('Suuuuuuuuuuuuper ADMIN');
    return next();
  } 
  console.log('Гость НЕ ПРОПУУУУУУУУУУУУУУЩЩЩЩЩЩЩЕННННННННННННННННННННННННННННННННННННННННННННННННННННН В АДМИНКУ');
  return res.redirect('/');
};

module.exports = {
  checkAdmin,
};
