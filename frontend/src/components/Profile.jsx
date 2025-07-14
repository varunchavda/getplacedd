import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./shared/Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const isResume = user?.profile?.resume ? true : false;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Full-width sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar className="w-full" />
      </div>

      {/* Page Content */}
      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Profile
          </motion.h1>

          <motion.p
            className="text-gray-600 text-base sm:text-lg mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Manage your account details and track your applications.
          </motion.p>

          {/* Profile Card */}
          <motion.div
            className="bg-white border border-gray-300 rounded-2xl px-6 py-6 shadow-sm mt-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Edit Profile Button */}
            <Button
              onClick={() => setOpen(true)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition shadow-sm"
            >
              <Pen className="w-5 h-5" />
            </Button>

            {/* Profile Info Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="User Avatar"
                />
              </Avatar>
              <div className="text-center sm:text-left">
                <h2 className="font-semibold text-2xl text-gray-900">
                  {user?.fullname || "N/A"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {user?.profile?.bio || "No bio available"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="my-6 space-y-3 text-sm sm:text-base">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="text-gray-500" />
                <span>{user?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Contact className="text-gray-500" />
                <span>{user?.phoneNumber || "N/A"}</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="my-6">
              <h3 className="text-gray-800 font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 hover:text-gray-900 transition"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </div>
            </div>

            {/* Resume Link */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <Label className="text-gray-800 font-semibold">Resume</Label>
              {isResume ? (
                <div className="mt-1">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user?.profile?.resume}
                    className="text-blue-600 hover:underline font-medium break-all"
                  >
                    {user?.profile?.resumeOriginalName || "Download Resume"}
                  </a>
                </div>
              ) : (
                <span className="text-gray-500 mt-1 block">N/A</span>
              )}
            </div>
          </motion.div>

          {/* Applied Internships Table */}
          <motion.div
            className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm mt-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              Applied Internships
            </h3>
            <AppliedJobTable />
          </motion.div>
        </div>
      </main>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
