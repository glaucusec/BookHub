const path = require('path');
const rootDir = require('../util/path');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
    if(req.cookies.session_sid && req.session.user) {
      try {
         const userInfo = await User.findByPk(req.session.user.id)
         if(userInfo) { req.user = userInfo }
         next();
      } catch(err) {
         console.log(err);
         res.status(401).sendFile(path.join(rootDir, 'views', '401.html'));
      }
    } else {
       res.status(401).sendFile(path.join(rootDir, 'views', '401.html'));
    }
}
