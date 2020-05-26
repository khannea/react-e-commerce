const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token =
    req.body.w_auth ||
    req.query.w_auth ||
    req.headers["x-access-w_auth"] ||
    req.cookies.w_auth;
  //let token = req.cookies.w_auth;
  console.log(token);
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (token === undefined) {
      return res.json({
        isAuth: false,
        error: "No token found",
      });
    }
    if (!user)
      return res.json({
        isAuth: false,
        error: "User not found",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
