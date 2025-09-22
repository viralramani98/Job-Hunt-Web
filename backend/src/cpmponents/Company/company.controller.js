import { Company } from "./company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userID: req.id,
    });
    return res.status(201).json({
      message: "Company registerd successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error.message, "Error while registering company");
  }
};

export const getCompany = async (req, res) => {
  try {
    const userID = req.id; // loged in user id
    const companies = await Company.find({ userID });
    if (!companies) {
      return res.status(404).json({
        message: "copmpany not found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while geting company.");
  }
};

// get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyid = req.params.id;
    const comapny = await Company.findById(companyid);
    if (!comapny) {
      return res.status(404).json({
        message: "copmpany not found",
        success: false,
      });
    }
    return res.status(200).json({
      comapny,
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while geting company by id.");
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary aavse aya
    const updatedata = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updatedata, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Updated.",
      success: true,
    });
  } catch (error) {
    console.log(error.message, "error while updating company.");
  }
};
