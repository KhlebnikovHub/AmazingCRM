require('dotenv').config();

const { User } = require('../db/models');

const checkUser = async (req, res, next) => {
 
  if(req.query.login) {
    return res.render('main');
  }

  if(req.session?.passport?.user?.moderator === 'true' || req.session?.passport?.user?.admin === 'true') {
    return next();
  }
 console.log('REEEEEEEEEEEEEEEEEEEEEEQ', req.session?.passport);
  if (req.session?.passport?.user) {
   
    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
    // const authorization = 'false';

    const ourUser = await User.findOne({ where: { email: req.session?.passport?.user?.emails[0]?.value } });
    console.log('HEEEEEEEEEEEEEEEEERE', ourUser);

    if (ourUser) {
      req.session.user_id = ourUser.id;
      if (ourUser.type === 'moderator') {
        req.session.passport.user.moderator = 'true';
        return next();
      } else if (ourUser.type === 'admin' || ourUser.email === process.env.ADMIN) {
        if(ourUser.email === process.env.ADMIN && ourUser.type !== 'admin') {
          ourUser.type = 'admin';
          ourUser.save();
        }
        req.session.passport.user.admin = 'true';
        return next();
      }
      else if (ourUser.type === 'guest') {
        return res.redirect('/?login=g')
      }
    } else {
      await User.create({
        type: 'guest', email, firstName, lastName, phoneNumb: 'Отсутствует',
      });
    }
    return next();
  } else { 
    return res.redirect('/user/signIn');  
  }
};

module.exports = {
  checkUser,
};
