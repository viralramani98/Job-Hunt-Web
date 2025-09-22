import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "./user.model.js";
import getUriData from "../config/dataURI.js";
import cloudinary from "../config/Cloudinary.js";

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
        message: "user already exist, please try different email.",
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
      profile: {
        avatar: req.file ? req.file.filename : null, // optional
      },
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
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const responseUser = {
      _id: User._id,
      username: User.username,
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
        message: `Welcome back ${User.username}`,
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
// const updateProfile = async (req, res) => {
//   try {
//     const { username, email, phonenumber, bio, skills } = req.body;
//     console.log(username, "=======req.body===========");

//     const file = req.file; // for future use (resume/profile photo)

//     // let skillsArray;
//     // if (skillsArray) {
//     //   skillsArray = skills.split(",");
//     // }

//     let skillsArray = [];
//     if (skills) {
//       if (Array.isArray(skills)) {
//         skillsArray = skills;
//       } else {
//         skillsArray = skills.split(",").map((s) => s.trim());
//       }
//     }

//     const userID = req.id; // set by auth middleware
//     if (!userID) {
//       return res.status(401).json({
//         message: "Unauthorized. User ID missing from request.",
//         success: false,
//       });
//     }

//     const User = await user.findById(userID);

//     if (!User) {
//       return res.status(400).json({
//         message: "user not found",
//         success: false,
//       });
//     }

//     // update fields
//     if (username) {
//       User.username = username;
//     }
//     if (email) {
//       User.email = email;
//     }
//     if (phonenumber) {
//       User.phonenumber = phonenumber;
//     }
//     if (bio) {
//       User.profile.bio = bio;
//     }
//     if (skills) {
//       User.profile.skills = skillsArray;
//     }

//     await User.save();

//     const responseUser = {
//       _id: User._id,
//       username: User.username,
//       email: User.email,
//       phonenumber: User.phonenumber,
//       role: User.role,
//       profile: User.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       success: true,
//       user: responseUser,
//     });
//   } catch (error) {
//     res.status(500).json(error.message || "error while updating profile");
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     console.log(req.body, "========");

//     const { username, email, phonenumber, bio, skills } = req.body;
//     const file = req.file; // for resume/profile photo (future use)
//     const fileURI = getUriData(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileURI.content);

//     let skillsArray = [];
//     if (skills) {
//       if (Array.isArray(skills)) {
//         skillsArray = skills;
//       } else {
//         try {
//           // sometimes frontend sends JSON string for skills
//           skillsArray = JSON.parse(skills);
//           if (!Array.isArray(skillsArray)) {
//             skillsArray = skills.split(",").map((s) => s.trim());
//           }
//         } catch (err) {
//           skillsArray = skills.split(",").map((s) => s.trim());
//         }
//       }
//     }

//     // Ensure req.id is coming from auth middleware
//     const userID = req.id;
//     if (!userID) {
//       return res.status(401).json({
//         message: "Unauthorized. User ID missing from request.",
//         success: false,
//       });
//     }

//     // Find user
//     const UserDoc = await user.findById(userID);
//     if (!UserDoc) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     // Update fields
//     if (username) UserDoc.username = username;
//     if (email) UserDoc.email = email;
//     if (phonenumber) UserDoc.phonenumber = phonenumber;
//     if (bio) UserDoc.profile.bio = bio;
//     if (skillsArray.length > 0) UserDoc.profile.skills = skillsArray;

//     if(cloudResponse){
//       user.profile.resume = cloudResponse.secure_url // save the cloudinary utl
//       user.profile.resumeoriginalname =file.originalname // save the original file name
//     }

//     await UserDoc.save();

//     const responseUser = {
//       _id: UserDoc._id,
//       username: UserDoc.username,
//       email: UserDoc.email,
//       phonenumber: UserDoc.phonenumber,
//       role: UserDoc.role,
//       profile: UserDoc.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       success: true,
//       user: responseUser,
//     });
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     return res.status(500).json({
//       message: error.message || "Error while updating profile",
//       success: false,
//     });
//   }
// };

const updateProfile = async (req, res) => {
  try {
    console.log("🔹 Incoming update request body:", req.body);
    console.log("🔹 Incoming file:", req.file);
    console.log("🔹 User ID from middleware:", req.id);

    const { username, email, phonenumber, bio, skills } = req.body;
    const file = req.file;

    let cloudResponse;
    if (file) {
      console.log("Uploading file to Cloudinary...");
      const fileURI = getUriData(file);
      cloudResponse = await cloudinary.uploader.upload(fileURI.content);
      console.log("✅ Cloudinary upload success:", cloudResponse.secure_url);
    }

    // Handle skills
    let skillsArray = [];
    if (skills) {
      try {
        skillsArray = Array.isArray(skills)
          ? skills
          : JSON.parse(skills);
      } catch {
        skillsArray = skills.split(",").map((s) => s.trim());
      }
    }

    // Check req.id
    if (!req.id) {
      return res.status(401).json({
        message: "Unauthorized: req.id missing",
        success: false,
      });
    }

    const UserDoc = await user.findById(req.id);
    if (!UserDoc) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update values
    if (username) UserDoc.username = username;
    if (email) UserDoc.email = email;
    if (phonenumber) UserDoc.phonenumber = phonenumber;
    if (bio) UserDoc.profile.bio = bio;
    if (skillsArray.length > 0) UserDoc.profile.skills = skillsArray;

    if (cloudResponse) {
      UserDoc.profile.resume = cloudResponse.secure_url;
      UserDoc.profile.resumeOriginalName = file.originalname;
    }

    await UserDoc.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: UserDoc._id,
        username: UserDoc.username,
        email: UserDoc.email,
        phonenumber: UserDoc.phonenumber,
        role: UserDoc.role,
        profile: UserDoc.profile,
      },
    });
  } catch (error) {
    console.error("❌ Update Profile Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};


export { register, login, logout, updateProfile };
