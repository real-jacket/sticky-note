var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function (user, done) {
    console.log('-------serializeUser---------')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log('-------deserializeUser---------')
    done(null, obj);
    // User.findById(id, function (err, user) {
    //     done(err, obj);
    // });
});


passport.use(new GitHubStrategy({
        clientID: "dccfdfc54363e0979be8",
        clientSecret: "26d120b1e7ff4fad48644a7c198c66d2dfc02100",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate({
        //     githubId: profile.id
        // }, function (err, user) {
        //     return cb(err, user);
        // });
        done(null,profile)
    }
));

//注销
router.get('/logout', function (req, res, next) {
    req.session.destroy()
    res.redirect('/')
})

/* GET auth page. 登陆路由 */
router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        console.log(req.user)
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.login,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;