import express from "express";
import userRouter from "../cpmponents/user/user.route.js";
import companyRouter from "../cpmponents/Company/company.routes.js";
import jobRouter from "../cpmponents/job/job.route.js";
import applicationsRouter from "../cpmponents/Application/application.route.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/company", companyRouter);
router.use("/jobs", jobRouter);
router.use("/application", applicationsRouter);

export default router;
