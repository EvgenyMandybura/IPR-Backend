const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "cleveroad";

const createUser = async ({ firstName, lastName, email, password }) => {
  return await db.User.create({ firstName, lastName, email, password });
};

const getUser = async (obj) => {
  return await db.User.findOne({
    where: obj,
  });
};

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    getUser({ email: email })
      .then((user) => {
        if (!user) {
          res.status(401).json({ msg: "No such user found" });
        }
        if (user.password === password) {
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: "ok", token: token, user });
        } else {
          res.status(401).json({ msg: "Password is incorrect" });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

router.post("/signup", function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  getUser({ email: email })
    .then((user) => {
      if (!!user) {
        res.status(401).json({ msg: "This user already exist" });
      } else {
        createUser({ firstName, lastName, email, password }).then((user) => {
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ user, token: token, msg: "account created successfully" });
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json("logout successful");
});

module.exports = router;
