const Unauthorized = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // const jwt = req.cookies.jwt;
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Unauthorized("Необходима авторизация");
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new Unauthorized("Необходима авторизация");
  }

  req.user = payload;
  next();
};
