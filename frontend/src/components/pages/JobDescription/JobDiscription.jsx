import React from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

const JobDescription = () => {
  const isApplied = true;
  return (
    <div className="max-w-7xl mx-auto my-10 px-6">
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            Frontend Developer
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge
              className="bg-blue-100 text-blue-700 font-semibold px-3 py-1"
              variant="outline"
            >
              12 Positions
            </Badge>
            <Badge
              className="bg-red-100 text-[#F83002] font-semibold px-3 py-1"
              variant="outline"
            >
              Part Time
            </Badge>
            <Badge
              className="bg-purple-100 text-[#7209b7] font-semibold px-3 py-1"
              variant="outline"
            >
              24 LPA
            </Badge>
          </div>
        </div>

        {/* Right Section */}

        <Button disabled={isApplied} className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`} >
          {isApplied ? "Alraedy Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Descripiton</h1>
      <div className="my-4 ">
        <h1 className="font-bold my-1 ">Role : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Locatoin : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Description : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Experience : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Salary : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Total Applicant : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
        <h1 className="font-bold my-1 ">Posted Date : <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
