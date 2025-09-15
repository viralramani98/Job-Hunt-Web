import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "./user.model.js";

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { username, email, password, phonenumber, role } = req.body;
    if (!username || !email || !password || !phonenumber || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const User = await user.findOne({ email });
    if (User) {
      return res.status(400).json({
        message: "user already exist , please try different email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      username,
      email,
      password: hashedPassword,
      role,
      phonenumber,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json(error.message || "error while register");
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    let User = await user.findOne({ email });
    if (!User) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, User.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }

    // check role
    if (role !== User.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role",
        success: false,
      });
    }

    const tokenData = { userID: User._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const responseUser = {
      _id: User._id,
      username: User.username, // changed fullname -> username
      email: User.email,
      phonenumber: User.phonenumber,
      role: User.role,
      profile: User.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${User.username}`, // changed fullname -> username
        success: true,
        user: responseUser,
      });
  } catch (error) {
    res.status(500).json(error.message || "error while login");
  }
};

// ================= LOGOUT =================
const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json(error.message || "error while logout");
  }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const { username, email, phonenumber, bio, skills } = req.body;
    const file = req.file; // for future use (resume/profile photo)

    let skillsArray;
    if (skillsArray) {
      skillsArray = skills.split(",");
    }
    const userID = req.id; // set by auth middleware
    const User = await user.findById(userID);

    if (!User) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    // update fields
    if (username) {
      User.username = username;
    }
    if (email) {
      User.email = email;
    }
    if (phonenumber) {
      User.phonenumber = phonenumber;
    }
    if (bio) {
      User.profile.bio = bio;
    }
    if (skills) {
      User.profile.skills = skillsArray;
    }

    await User.save();

    const responseUser = {
      _id: User._id,
      username: User.username,
      email: User.email,
      phonenumber: User.phonenumber,
      role: User.role,
      profile: User.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      success: true,
      user: responseUser,
    });
  } catch (error) {
    res.status(500).json(error.message || "error while updating profile");
  }
};

export { register, login, logout, updateProfile };
