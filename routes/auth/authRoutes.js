const router = require('express').Router();
const db = require('../../models');
const passport = require('../../config/passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.post('/signup', (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  })
      .then((dbResponse) => {
        res.json(dbResponse);
      })
      .catch((err) => {
        res.json(err);
      });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json('logout successful');
});

router.get('/user_data', (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
