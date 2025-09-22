import React from "react";
import Navbar from "../../common/Navbar/Navbar";
import Filtercards from "../../jobcomponents/Filtercards/Filtercards";
import Job from "../../jobcomponents/Job/Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-20%">
            <Filtercards />
          </div>
          {jobArray.length < 0 ? (
            <span>Jon Not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((item, index) => (  
                  <div>
                    <Job />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
