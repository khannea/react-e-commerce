const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token =
    req.body.webAuth ||
    req.query.webAuth ||
    req.headers["x-access-webAuth"] ||
    req.cookies.webAuth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    else if (token === undefined) {
      return res.json({
        isAuth: false,
        error: "No token found",
      });
    } else if (!user)
      return res.json({
        isAuth: false,
        error: "User not found",
      });
    else {
      req.token = token;
      req.user = user;
      next();
    }
  });
};

module.exports = { auth };
