import jwt from "jsonwebtoken";

function requireAuth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "login required",
    });
  }

  try {
    let verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid or expired token",
    });
  }
}

export default requireAuth;