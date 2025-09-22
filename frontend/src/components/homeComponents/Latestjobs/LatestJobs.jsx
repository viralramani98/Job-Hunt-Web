import React from "react";
import Latestjobscards from "./Latestjobcards";

const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8];

const Latestjobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>

      {/* Jobs Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {randomjobs.slice(0, 6).map((item, index) => (
          <Latestjobscards key={index} />
        ))}
      </div>
    </div>
  );
};

export default Latestjobs;
