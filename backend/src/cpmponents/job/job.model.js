import { model, Schema } from "mongoose";

const jobSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    requirements: [
      {
        type: Number,
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobtype: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["stident", "recruiter"],
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    applications : [{
        type: Schema.Types.ObjectId,
      ref: "Application",
    }],
  },
  { timestamps: true }
);
export const job = model("job", jobSchema);
