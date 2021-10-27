const router = require('express').Router();
const db = require('../../models');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'cleveroad';

const createUser = async ({ firstName, lastName, email, password }) => {
  return await db.User.create({ firstName, lastName, email, password });
};

const getUser = async obj => {
    return await db.User.findOne({
        where: obj,
    });
};

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
      let user = await getUser({ email: email });
      if (!user) {
          res.status(401).json({ message: 'No such user found' });
      }
      if (user.password === password) {
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: 'ok', token: token, user });
      } else {
          res.status(401).json({ msg: 'Password is incorrect' });
      }
  }
});

router.post('/signup', function(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  createUser({ firstName, lastName, email, password }).then(user => {
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({user, token: token, msg: 'account created successfully'})
  }).catch((err) => {
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
