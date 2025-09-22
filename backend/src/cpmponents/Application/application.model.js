import { model, Schema } from "mongoose";

const ApplicationSchema = Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    location: {
      type: String,
    },
    logo: {
      type: String, // url for company logo
    },
  },
  { timestamps: true }
);
export const Application = model("application", ApplicationSchema);
