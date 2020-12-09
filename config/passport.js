const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('./../models/userModel');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
            session: false
        },
        async function (req, email, password, done) {
            try {
                const user = await User.findOne({ email: email });
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return done(err);
                    }
                    if (!result) {
                        console.error('Incorrect username and password')
                        return done(null, false, {
                            message: 'Incorrect username and password',
                        });

                    }
                    console.log('Success')
                    return done(null, user);
                });
            } catch (err) {
                return done(err);
            };
        })
    );
}