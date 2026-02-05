import rateLimit from "../config/upstash.js";

export default async function rateLimiter(req, res, next) {
  try {
    const { success } = await rateLimit.limit("limitless");
    if (!success)
      return res
        .status(429)
        .json({ message: "Too many requests try again later" });
    return next();
  } catch (error) {
    console.log("Error in rate limiter middleware", error);
    res.status(500).json({ message: "Server error" });
  }
}
