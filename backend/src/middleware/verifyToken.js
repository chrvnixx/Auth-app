import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorised - Invalid token" });
    }
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in verify token middleware", error);
  }
}
