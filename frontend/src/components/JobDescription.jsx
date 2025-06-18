import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
// importing API endpoint constants so no need to add hardcode URLs.
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  // Getting job ID from the URL, usinr params
  // Suppose your URL is /job/123, this gives you jobId = "123".
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();


  // Function to handle job application.
  // This function is called when the user clicks the "Apply Now" button.
  // If successful : Adds user to the job’s applications array.
  const applyJobHandler = async () => {
    if (isApplied) return;
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  // Fetching Job Data using useEffect.
  // This will run when the component mounts and whenever jobId changes.
  // Calls the API: /get/jobId to fetch job details.


  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            ) || false
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div className="text-center mt-10 text-lg">Loading job details...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md border border-gray-300">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-400 pb-4">
          <div>
            <h1 className="font-bold text-2xl text-gray-900">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge className="text-blue-700 font-bold border-blue-700 px-3 py-1" variant="ghost">
                {singleJob?.position ? `${singleJob.position} Positions` : "Position Unavailable"}
              </Badge>
              <Badge className="text-orange-500 font-bold border-orange-500 px-3 py-1" variant="ghost">
                {singleJob?.jobType || "Type Unavailable"}
              </Badge>
              <Badge
                className={`px-3 py-1 font-bold border ${
                  Number(singleJob?.salary) > 0 ? "text-green-600 border-green-600" : "text-red-600 border-red-600"
                }`}
                variant="ghost"
              >
                {Number(singleJob?.salary) > 0 ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          </div>
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-2 font-medium text-white rounded-md transition-all ${
              isApplied
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-purple-800 hover:bg-purple-900"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Details Section */}
        <div className="p-6 bg-gray-100 rounded-md border border-gray-200">
          <h1 className="border-b border-gray-400 font-semibold text-lg pb-2 mb-4 text-gray-800">
            Job Description
          </h1>

          <div className="space-y-3 text-gray-800">
            <p>
              <span className="font-semibold">Role:</span>{" "}
              <span className="text-gray-700">{singleJob?.title}</span>
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              <span className="text-gray-700">{singleJob?.location}</span>
            </p>
            <p className="font-semibold flex flex-wrap items-center gap-2">
              Requirements:
              {singleJob?.requirements && typeof singleJob.requirements === 'string'
                ? singleJob.requirements.split(",").map((req, index) => (
                    <span
                      key={index}
                      className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded-md text-sm"
                    >
                      {req.trim()}
                    </span>
                  ))
                : <span className="ml-2 text-gray-600">Not specified</span>}
            </p>

            <p>
              <span className="font-semibold">Description:</span>{" "}
              <span className="text-gray-700">{singleJob?.description || "Not available"}</span>
            </p>
            <p>
              <span className="font-semibold">Internship Duration:</span>{" "}
              <span className="text-gray-700">{singleJob?.duration || "N/A"} Months</span>
            </p>
            <p>
              <span className="font-semibold">Stipend:</span>{" "}
              <span className="text-gray-700">
                {singleJob?.salary > 0 ? `₹${singleJob.salary}` : "Unpaid"}
              </span>
            </p>
            <p>
              <span className="font-semibold">Total Applicants:</span>{" "}
              <span className="text-gray-700">{singleJob?.applications?.length || 0}</span>
            </p>
            <p>
              <span className="font-semibold">Posted Date:</span>{" "}
              <span className="text-gray-700">
                {singleJob?.createdAt?.split("T")[0] || "Unknown"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
