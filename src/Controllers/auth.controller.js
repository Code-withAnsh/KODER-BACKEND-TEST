import UserModel from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "username, email and password are required",
      });
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExist) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, email, password: hash });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "user registered successfully",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "registration failed" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return res.status(401).json({
        message: "invalid credential",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "invalid password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "logged in succesfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "login failed",
    });
  }
}
async function logOut(req, res) {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({
    message: "log out successfully",
  });
}
export default {
  registerUser,
  loginUser,
  logOut,
};
