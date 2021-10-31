const router = require("express").Router();
const db = require("../../models");
const passport = require("passport");
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "cleveroad";

router.get("/", function (req, res) {
  res.json({ message: "Express is up!" });
});

router.get("/products", (req, res) => {
  db.Product.findAll()
    .then((pictures) => {
      res.json(pictures);
    })
    .catch((err) => console.log(err));
});

router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.Product.create({
      productName: req.body.productName,
      creatorEmail: req.body.creatorEmail,
      creatorFullName: req.body.creatorFullName,
      imgUrl: req.body.imgUrl,
    })
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    db.Product.findAll()
      .then((pictures) => {
        res.json(pictures);
      })
      .catch((err) => res.json(err));
  }
);

router.get(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    db.Product.findByPk(id)
      .then((pictures) => {
        res.json(pictures);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
