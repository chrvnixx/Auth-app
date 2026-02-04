import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import sendVerificationEmail from "../mailtrap/email.js";

export async function signup(req, res) {
  const { email, password, name, userName } = req.body;
  try {
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const userAlreadyExists = await User.findOne({ email } || { userName });

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

    sendVerificationEmail(email, verificationToken);

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
    // if (!email || !password) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields are required" });
    // }

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
        .json({ success: false, message: "Invalid credentials password" });
    }

    user.lastLogin = Date.now();

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
}
