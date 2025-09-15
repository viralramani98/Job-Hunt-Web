import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"], // fixed typo
      required: true,
    },  
    profile: {
      bio: { type: String }, // fixed typo
      skills: [{ type: String }], // fixed name
      resume: { type: String }, // url for resume file
      resumeOriginalName: { type: String }, // fixed typo
      company: { type: Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const user = model("User", userSchema);
