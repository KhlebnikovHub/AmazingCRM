const { User } = require('../db/models');

const initUser = async (req, res, next) => {
 
  if(req.session?.passport?.user?.moderator === 'true') {
    return next();
  }

  if (req.session?.passport?.user) {
    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
    const ourUser = await User.findOne({ where: { email: req.session?.passport?.user?.emails[0]?.value } });
    console.log('HEEEEEEEEEEEEEEEEERE', ourUser);

    if (ourUser) {
      if (ourUser.type === 'moderator') {
        req.session.passport.user.moderator = 'true';
        return next();
      } 
    } else {
      await User.create({
        type: 'guest', email, firstName, lastName, phoneNumb: 'Отсутствует',
      });
    }
  }

  return next();
}







module.exports = { initUser };
