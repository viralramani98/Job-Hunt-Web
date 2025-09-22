import { model, Schema } from "mongoose";

const CompanySchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: Number,
    },
    location: {
      type: String,
    },
    logo: {
      type: String, // url for company logo
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Company = model("company", CompanySchema);
