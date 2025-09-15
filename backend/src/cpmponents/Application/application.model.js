import { model, Schema } from "mongoose";

const ApplicationSchema = Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applica: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      enum: ["penidng", "accepted", "rejected"],
      default: "pending",
    },
    location: {
      type: String,
    },
    logo: {
      type: String, // url for company logo
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
export const Application = model("job", ApplicationSchema);
F;
