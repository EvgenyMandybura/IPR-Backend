const router = require('express').Router();
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const db = require('../../models');

router.get('/secrets', isAuthenticated, (req, res) => {
    res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

router.get('/pictures', isAuthenticated, (req, res) => {
    db.Picture.findAll().then(pictures=>{
        res.json(pictures);
    }).catch(err=>console.log(err));
});

router.get('/picturesAll', isAuthenticated, (req, res) => {

    db.Picture.findAll(
        {
            where: {
                creatorEmail: "qwe@gmail.com"
            }}
    ).then(pictures=>{
        res.json(pictures);
    }).catch(err=>console.log(err));
});

router.post('/pictureCreate', isAuthenticated, (req, res) => {
    db.Picture.create({
        title: req.body.title,
        creatorEmail: req.body.creatorEmail
    }).then(res=>{
        res.json(res);
    }).catch(err=>{
        res.json(err);
    });
});

module.exports = router;