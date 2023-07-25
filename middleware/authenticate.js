const path = require('path');
const rootDir = require('../util/path');
const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
   const user = await User.findById('64ace9c312d8747ec2d19e65').select('_id email')
   req.user = { _id: user._id , email: user.email }
   next();
   //  if(req.cookies.session_sid && req.session.user) {
   //    try {
   //       const userInfo = await User.findById(req.session.user.id)
   //       if(userInfo) { req.user = userInfo }
   //       console.log(`authenticated UserID: ${req.user.id}`)
   //       next();
   //    } catch(err) {
   //       console.log(err);
   //       res.status(401).sendFile(path.join(rootDir, 'views', '401.html'));
   //    }
   //  } else {
   //     res.status(401).sendFile(path.join(rootDir, 'views', '401.html'));
   //  }
}
