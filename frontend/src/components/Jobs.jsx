import React, { useEffect, useState, useRef } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setSearchedQuery } from "@/redux/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const filterRef = useRef(null);

  const handleFilterChange = () => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setIsFilterVisible(false);
      }, 150);
    }
  };

  const handleResetFilters = () => {
    dispatch(setSearchedQuery(""));
    setHasActiveFilters(false);
    setFilterJobs(allJobs);
    handleFilterChange();
  };

  const checkActiveFilters = () => {
    const hasFilters = searchedQuery && searchedQuery.trim() !== "";
    setHasActiveFilters(hasFilters);
  };

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) =>
        ["title", "requirements"].some((key) =>
          job[key]?.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }

    checkActiveFilters();

    if (searchedQuery && window.innerWidth < 1024) {
      setTimeout(() => {
        setIsFilterVisible(false);
      }, 150);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-full mx-auto mt-6 flex-1 px-4 lg:px-6 max-w-7xl">
        {/* Mobile + Tablet Layout */}
        <div className="block lg:hidden">
          <div className="bg-white pb-4 mb-4 border-b border-gray-100">
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="bg-[#6A38C2] text-white py-3 px-4 rounded-lg flex-1 text-center font-medium shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {isFilterVisible ? "Hide Filters" : "Show Filters"}
              </button>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleResetFilters}
                  className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg text-center font-medium shadow-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </motion.button>
              )}
            </div>
          </div>

          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFilterVisible ? 'max-h-screen opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div onClick={handleFilterChange}>
                <FilterCard />
              </div>
            </div>
          </div>

          <div className="w-full">
            {filterJobs.length > 0 ? (
              <div className="space-y-4 w-full px-1">
                {filterJobs.map((job, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    key={job?._id}
                    className="w-full block max-w-md mx-auto"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center min-h-[60vh] w-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg font-semibold mb-2">
                    No jobs found
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    Try adjusting your search or filters
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="bg-[#6A38C2] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5a2d9f] transition-colors"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-6 min-h-[80vh]">
          <div ref={filterRef} className="col-span-1 w-full">
            <FilterCard />
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="min-h-[80vh] flex flex-col">
              {filterJobs.length > 0 ? (
                <div className="overflow-y-auto custom-scrollbar flex-1">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}
                        className="w-full"
                      >
                        <Job job={job} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center flex-1">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg font-semibold mb-4">
                      No jobs found.
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={handleResetFilters}
                        className="bg-[#6A38C2] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5a2d9f] transition-colors"
                      >
                        Reset all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style>{`
        .custom-scrollbar {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #b0b0b0 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b0b0b0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      `}</style>
    </div>
  );
};

export default Jobs;
