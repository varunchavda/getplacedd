import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {

  // It grabs all the job listings from Redux store.
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest </span>Openings
      </h1>

      {/* Responsive Grid Layout */}
      {/* a responsive grid (1 column on mobile, 3 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
