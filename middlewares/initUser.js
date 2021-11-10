require('dotenv').config();

const { User } = require('../db/models');

const initUser = async (req, res, next) => {
  if (
    req.session?.passport?.user?.moderator === 'true' ||
    req.session?.passport?.user?.admin === 'true'
  ) {
    return next();
  }

  if (req.session?.passport?.user) {
    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
    const ourUser = await User.findOne({
      where: { email: req.session?.passport?.user?.emails[0]?.value },
    });

    if (ourUser) {
      if (ourUser.type === 'moderator') {
        req.session.passport.user.moderator = 'true';
        return next();
      }
      if (ourUser.type === 'admin' || ourUser.email === process.env.ADMIN) {
        if (ourUser.email === process.env.ADMIN && ourUser.type !== 'admin') {
          ourUser.type = 'admin';
          ourUser.save();
        }
        req.session.passport.user.admin = 'true';
        return next();
      }
    } else {
      await User.create({
        type: 'guest',
        email,
        firstName,
        lastName,
        phoneNumb: 'Отсутствует',
      });
    }
  }

  return next();
};

module.exports = { initUser };
