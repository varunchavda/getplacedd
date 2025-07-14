import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

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
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

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
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 my-8">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-300 pb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{singleJob?.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge className="text-blue-700 font-semibold border-blue-700 px-3 py-1" variant="ghost">
                  {singleJob?.position ? `${singleJob.position} Positions` : "Position Unavailable"}
                </Badge>
                <Badge className="text-orange-500 font-semibold border-orange-500 px-3 py-1" variant="ghost">
                  {singleJob?.jobType || "Type Unavailable"}
                </Badge>
                <Badge
                  className={`px-3 py-1 font-semibold border ${
                    Number(singleJob?.salary) > 0
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  }`}
                  variant="ghost"
                >
                  {Number(singleJob?.salary) > 0 ? "Paid" : "Unpaid"}
                </Badge>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Button
                onClick={applyJobHandler}
                disabled={isApplied}
                className={`w-full md:w-auto px-6 py-2 font-medium text-white rounded-md transition-all ${
                  isApplied ? "bg-gray-700 cursor-not-allowed" : "bg-purple-800 hover:bg-purple-900"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-4 md:p-6 bg-gray-50 rounded-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Job Description
            </h2>
            <div className="space-y-3 text-gray-800 text-sm md:text-base">
              <p>
                <strong>Role:</strong> {singleJob?.title}
              </p>
              <p>
                <strong>Location:</strong> {singleJob?.location}
              </p>
              <p className="font-semibold flex flex-wrap items-center gap-2">
                Requirements:
                {singleJob?.requirements && typeof singleJob.requirements === "string" ? (
                  singleJob.requirements.split(",").map((req, index) => (
                    <span
                      key={index}
                      className="ml-2 px-2 py-1 bg-gray-200 text-gray-800 rounded-md text-xs md:text-sm"
                    >
                      {req.trim()}
                    </span>
                  ))
                ) : (
                  <span className="ml-2 text-gray-600">Not specified</span>
                )}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {singleJob?.description || "Not available"}
              </p>
              <p>
                <strong>Internship Duration:</strong> {singleJob?.duration || "N/A"} Months
              </p>
              <p>
                <strong>Stipend:</strong>{" "}
                {singleJob?.salary > 0 ? `₹${singleJob.salary}` : "Unpaid"}
              </p>
              <p>
                <strong>Total Applicants:</strong>{" "}
                {singleJob?.applications?.length || 0}
              </p>
              <p>
                <strong>Posted Date:</strong>{" "}
                {singleJob?.createdAt?.split("T")[0] || "Unknown"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
