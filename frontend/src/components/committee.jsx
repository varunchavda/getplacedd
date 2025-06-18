import { motion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import Profile1 from "../assets/Varun.jpg";
import Profile2 from "../assets/Siddhant.jpeg";
import Profile3 from "../assets/mitesh.jpg";
import Profile4 from "../assets/Harsh.jpg";
import Profile5 from "../assets/Profile5.jpg";
import Footer from "./shared/Footer";

const images = [Profile1, Profile2, Profile3, Profile4, Profile5];

const teamMembers = [
  {
    name: "Varun Chavda",
    year: "Committee Head ",
    mobile: "9876543210",
    img: images[0],
  },
  {
    name: "Siddhant Iear",
    year: "Final Year - ",
    section: "BCA-B",
    mobile: "9876543211",
    img: images[1],
  },
  {
    name: "Mitesh Suthar",
    year: "Final Year - ",
    section: "BCA-A",
    mobile: "9876543212",
    img: images[2],
  },
  {
    name: "Harsh Jadav",
    year: "Final Year - ",
    section: "BCA-B",
    mobile: "9876543213",
    img: images[3],
  },
];

const PlacementTeam = () => {
  return (
    <>
      <div className="bg-white text-black flex flex-col min-h-screen">
        <Navbar />

        {/* Content Section */}
        <div className="flex-grow flex flex-col items-center pt-10 px-10 pb-4">
          <motion.h2
            className="text-3xl sm:text-5xl font-bold mb-6 text-black relative inline-block max-w-full text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-black">
              Meet Your{" "}
              <span className="relative text-[#FFD700] px-3 group whitespace-nowrap">
                Placement Team
                <span className="absolute left-0 w-full h-[3px] bg-[#FFD700] bottom-[-2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-700 mb-10 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            These legends got your back! Reach out for placement assistance,
            updates, and career guidance.
          </motion.p>

          {/* Responsive Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-black p-6 rounded-xl text-center shadow-lg border border-gray-700 hover:scale-105 transform transition-all"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-lg hover:grayscale-0 transition-all"
                />
                <h3 className="text-xl font-semibold text-[#FFD700] mt-4">
                  {member.name}
                </h3>
                <p className="text-white font-medium">
                  {member.year} {member.section}
                </p>
                <p className="text-gray-400 mt-1">📞 {member.mobile}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PlacementTeam;
