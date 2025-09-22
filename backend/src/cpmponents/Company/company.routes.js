import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "./company.controller.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticated, registerCompany);

companyRouter.put("/update/:id", isAuthenticated, updateCompany);

companyRouter.get("/get", isAuthenticated, getCompany);

companyRouter.get("/get/:id", isAuthenticated, getCompanyById);

export default companyRouter;
