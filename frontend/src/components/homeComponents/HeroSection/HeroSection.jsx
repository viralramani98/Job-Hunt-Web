import React from "react";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 py-20">
      <div className="text-center max-w-3xl mx-auto px-6">
        {/* Badge */}
        <span className="inline-block px-6 py-2 rounded-full bg-[#F83002]/10 text-[#F83002] font-semibold text-sm shadow-sm mb-6">
          🚀 No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="bg-gradient-to-r from-[#6A38C2] to-[#F83002] bg-clip-text text-transparent">
            Dream Job
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Discover thousands of job opportunities tailored for you. <br />
          Build your career with top companies and recruiters worldwide.
        </p>

        {/* Search Bar */}
        <div className="flex mt-10 w-full md:w-[70%] lg:w-[50%] mx-auto shadow-lg border border-gray-200 rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="🔍 Find your dream job"
            className="flex-1 px-5 py-3 text-gray-700 text-base outline-none focus:ring-2 focus:ring-[#6A38C2]"
          />
          <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-6 flex items-center gap-2 rounded-r-full">
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
