const router = require('express').Router();
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const db = require('../../models');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'cleveroad';



router.get('/', function(req, res) {
    res.json({ message: 'Express is up!' });
});

router.get('/all-products', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.Picture.findAll().then(pictures=>{
        res.json(pictures);
    }).catch(err=>console.log(err));
})

router.get('/pictures', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.Picture.findAll().then(pictures=>{
        res.json(pictures);
    }).catch(err=>console.log(err));
});

router.get('/picturesAll', passport.authenticate('jwt', { session: false }), (req, res) => {

    db.Picture.findAll(
        {
            where: {
                creatorEmail: "qwe@gmail.com"
            }}
    ).then(pictures=>{
        res.json(pictures);
    }).catch(err=>console.log(err));
});

router.post('/pictureCreate', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.Picture.create({
        title: req.body.title,
        creatorEmail: req.body.creatorEmail
    }).then(res=>{
        res.json(res);
    }).catch(err=>{
        res.json(err);
    });
});

router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success! You can now see this without a token.');
});


module.exports = router;