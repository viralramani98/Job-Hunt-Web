import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "./application.controller.js";
const applicationsRouter = express.Router();

applicationsRouter.get("/apply/:id", isAuthenticated, applyJob);

applicationsRouter.get("/get", isAuthenticated, getAppliedJobs);

applicationsRouter.get("/:id/applicants", isAuthenticated, getApplicants);

applicationsRouter.post("/status/:id/update", isAuthenticated, updateStatus);

export default applicationsRouter;
