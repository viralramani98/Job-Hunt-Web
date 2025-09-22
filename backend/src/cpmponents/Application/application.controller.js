import { Job } from "../job/job.model.js";
import { Application } from "./application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }
    if (!userID) {
      return res.status(400).json({
        message: "userId id is required",
        success: false,
      });
    }
    // check if a user has already applied for job
    const existingApplicatoin = await Application.findOne({
      job: jobId,
      applicant: userID,
    });
    if (existingApplicatoin) {
      return res.status(400).json({
        message: "you have already applied for this job.",
        success: false,
      });
    }

    // check if the job exists

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    // create a new application.
    const newAplication = await Application.create({
      job: jobId,
      applicant: userID,
    });
    job.applications.push(newAplication._id);
    await job.save();
    return res.status(201).json({
      message: "job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while applying job.");
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userID = req.id;
    const application = await Application.find({ applicant: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
      });
    if (!application) {
      return res.status(404).json({
        message: "no application.",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while geting applied jobs.");
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "no job found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while geting applicants.");
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required.",
        success: false,
      });
    }
    // find the application by application id.
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }

    // update the status.
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while updating status.");
  }
};
