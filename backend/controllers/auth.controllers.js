import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existemail = await User.findOne({ email });

    if (existemail) {
      return res.status(400).json({ message: "email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be atleast 6 characters" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedpassword,
      email,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usercheck = await User.findOne({ email });

    if (!usercheck) {
      return res.status(400).json({ message: "email doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, usercheck.password);

    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const token = await genToken(usercheck._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json(usercheck);
  } catch (error) {
    return res.status(201).json({ message: `login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: `User Logged Out` });
  } catch (error) {
    return res.status(201).json({ message: `logout error ${error}` });
  }
};
