import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel } from "../models/User.js";

// ✅ Authenticate Middleware
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await UserModel.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    console.error("❌ Authentication error:", err.message);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

// ✅ Authorize Middleware
export function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}
