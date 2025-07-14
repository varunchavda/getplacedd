
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 pb-16">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-[#6A38C2]">Latest </span>Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center">
            <p className="text-lg font-medium mb-4">No Job Available</p>
            <p className="text-sm text-gray-600 mb-4">Create Your Account & Discover Hot Openings!</p>
            <Link to="/signup">
              <button className="px-5 py-2 bg-[#6A38C2] text-white rounded-lg hover:bg-[#562aa5] transition duration-200">
                Register Now 🚀
              </button>
            </Link>
          </div>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
