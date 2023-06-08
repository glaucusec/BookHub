const path = require('path');
const bcrypt  = require('bcrypt');

const rootDir = require('../util/path')

const User = require('../models/user');

const viewController = {
    homePage: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'index.html'))
    },
    
    signUp: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'sign-up.html'));
    },

    signIn: (req, res, next) => {
        res.sendFile(path.join(rootDir, 'views', 'sign-in.html'));
    },

    signUpUser: async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const userExists = await User.findOne( {
                where: { email: email }
            })
            if( userExists ) { return res.status(409).json({ userExists: true }) }

            const saltrounds = 10;
            const encryptedPassword = await bcrypt.hash(password, saltrounds)
            await User.create( { name: name, email: email, password: password })
            console.log('New user signed up')
            res.status(200).json( { message: 'User created successfully '})
            
        } catch( error ) {
            console.log('Error@signUpUser -> ', error);
            res.status(500).json({ error: "Internal Server Error " })
        }
    }
}

module.exports = viewController;

// const rootDir = require('../util/path')
// const path = require('path');

// exports.homePage = (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'index.html'))
// }

// exports.signUp = (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'sign-up.html'));
// }

// exports.signIn = (req, res, next) => {
//     res.sendFile(path.join(rootDir, 'views', 'sign-in.html'));
// }

// exports.signUpUser = (req, res, next) => {
//     console.log(req.body);
// }