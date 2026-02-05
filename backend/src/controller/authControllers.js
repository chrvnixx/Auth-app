import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendResetLinkMail, sendVerificationEmail } from "../mailtrap/email.js";

const api_url = "http://localhost:5173";

export async function signup(req, res) {
  const { email, password, name, userName } = req.body;
  try {
    if ((!email, !userName) || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      userName,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 0.3 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(email, userName, verificationToken);

    return res.status(201).json({
      success: true,
      message: "New user created",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log("Error in signup controller", error);
  }
}

export async function verifyPassword(req, res) {
  const { code } = req.body;
  try {
    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Input verification code" });
    }

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in verify email", error);
  }
}

export async function login(req, res) {
  const { email, userName, password } = req.body;
  try {
    if ((!email && !userName) || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required login" });
    }

    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = Date.now();

    generateTokenAndSetCookie(res, user._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in login controller", error);
  }
}

export async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Loogged out" });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Input your email to continue" });
    }
    const user = await User.findOne({ email });

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = Date.now() + 0.3 * 60 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = resetPasswordTokenExpiresAt;

    await user.save();

    sendResetLinkMail(email, `${api_url}/reset-password/${resetPasswordToken}`);

    return res.status(200).json({
      success: true,
      message: "Reset Email sent",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in forgot password controller", error);
  }
}

export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!token) {
      return res.status(400).json({ success: false, message: "Request error" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const isOldPassword = await bcrypt.compare(password, user.password);
    if (isOldPassword) {
      return res
        .status(400)
        .json({ success: false, message: "You can't use your old password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: false,
      message: "Password reset successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in reset password controller", error);
  }
}

export async function checkAuth(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(200).json({ success: true, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log("Error in check auth controller", error);
  }
}
