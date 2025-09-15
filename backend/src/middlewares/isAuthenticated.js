import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => { 
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "user not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });
    }
    req.id = decode.userID;
    next();
  } catch (error) {
    res.status(500).json(error.message || "error while Authentication");
  }
};

export default isAuthenticated; 