import Company from "../Company/company.model.js";

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
    company = await Company.crate({
        name : companyName,
        userID : req.id,
         
    })
  } catch (error) {
    console.log(error.message, "Error while registering company");
  }
};
