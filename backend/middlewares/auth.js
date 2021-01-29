const Unauthorized = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  //Не удалось получить куки с фронта, поэтому не сделал
  // const jwt = req.cookies.jwt;
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Unauthorized("Необходима авторизация");
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev-secret");
  } catch (err) {
    throw new Unauthorized("Необходима авторизация");
  }

  req.user = payload;
  next();
};
