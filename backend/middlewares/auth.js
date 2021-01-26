const Unauthorized = require("../errors/unauthorized");
module.exports = (req, res, next) => {
  const jwt = req.cookies.jwt;
  if (!jwt || !jwt.startsWith("Bearer ")) {
    throw new Unauthorized("Необходима авторизация");
  }
  const token = jwt.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    throw new Unauthorized("Необходима авторизация");
  }

  req.user = payload;
  next();
};
