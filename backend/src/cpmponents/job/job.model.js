import { model, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      // ❌ removed unique: true (this caused E11000 duplicate key error)
    },
    requirements: [
      {
        type: String,
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
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    experienceLevel: {   // ✅ fixed spelling
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "application",
      },
    ],
  },
  { timestamps: true }
);

export const Job = model("job", jobSchema);
