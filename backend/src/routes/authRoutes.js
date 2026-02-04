import express from "express";
import {
  login,
  logout,
  signup,
  verifyPassword,
} from "../controller/authControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyPassword);

export default router;
