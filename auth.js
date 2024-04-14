const jwt = require("jsonwebtoken");

function validateToken(req, resp, next) {
  console.log(req);
  if (req.baseUrl.toLowerCase() == "/login") {
    return next();
  }
  const [, token] = req.headers.authorization?.split(" ") || [" ", " "];
  if (!token) {
    return resp.status(401).json({
      success: false,
      message: "no token provided",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    return next();
  } catch (error) {
    return resp.status(401).json({
      data: { error },
      success: false,
      message: "invalid token",
    });
  }
}

module.exports = {
  validateToken,
};
