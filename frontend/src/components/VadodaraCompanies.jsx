import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const companiesData = [
    {
      name: "Pardy Panda Studios",
      logo: "https://logo.clearbit.com/pardypanda.com",
      location: "Vadodara, Gujarat",
      website: "https://www.pardypanda.com/",
    },
    {
      name: "L&T Technology Services",
      logo: "https://logo.clearbit.com/ltts.com",
      location: "Vadodara, Gujarat",
      website: "https://www.ltts.com/",
    },
    {
      name: "Rishabh Software",
      logo: "https://logo.clearbit.com/rishabhsoft.com",
      location: "Vadodara, Gujarat",
      website: "https://www.rishabhsoft.com/",
    },
    {
      name: "TatvaSoft",
      logo: "https://logo.clearbit.com/tatvasoft.com",
      location: "Ahmedabad, Gujarat",
      website: "https://www.tatvasoft.com/",
    },
    {
      name: "Matrix Comsec",
      logo: "https://logo.clearbit.com/matrixcomsec.com",
      location: "Vadodara, Gujarat",
      website: "https://www.matrixcomsec.com/",
    },
    {
      name: "Spaculus Software",
      logo: "https://logo.clearbit.com/spaculus.com",
      location: "Vadodara, Gujarat",
      website: "https://spaculus.com/",
    },
    {
      name: "Atyantik Technologies",
      logo: "https://logo.clearbit.com/atyantik.com",
      location: "Vadodara, Gujarat",
      website: "https://atyantik.com/",
    },
    {
      name: "Prakash Software Solutions",
      logo: "https://logo.clearbit.com/prakashinfotech.com",
      location: "Vadodara, Gujarat",
      website: "https://www.prakashinfotech.com/",
    },
    {
      name: "Megh Technologies",
      logo: "https://logo.clearbit.com/meghtechnologies.com",
      location: "Vadodara, Gujarat",
      website: "https://www.meghtechnologies.com/",
    },
    {
      name: "Aroasis Softech",
      logo: "https://logo.clearbit.com/aroasis.com",
      location: "Vadodara, Gujarat",
      website: "https://aroasis.com/",
    },
    {
      name: "Novumlogic Technologies",
      logo: "https://logo.clearbit.com/novumlogic.com",
      location: "Vadodara, Gujarat",
      website: "https://novumlogic.com/",
    },
    {
      name: "Trizone Communications",
      logo: "https://logo.clearbit.com/trizoneindia.com",
      location: "Vadodara, Gujarat",
      website: "https://trizoneindia.com/",
    },
    {
      name: "Kraftbase",
      logo: "https://logo.clearbit.com/kraftbase.com",
      location: "Vadodara, Gujarat",
      website: "https://kraftbase.com/",
    },
    {
      name: "Intricare Technologies",
      logo: "https://logo.clearbit.com/intricaretech.com",
      location: "Vadodara, Gujarat",
      website: "https://intricaretech.com/",
    },
    {
      name: "Uniqtech Solutions",
      logo: "https://logo.clearbit.com/uniqtechsolutions.com",
      location: "Vadodara, Gujarat",
      website: "https://uniqtechsolutions.com/",
    },
  ];
  
  
const VadodaraCompanies = () => {
  const [search, setSearch] = useState("");

  const filteredCompanies = companiesData.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow px-4 md:px-20 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">
          Tech Companies in Vadodara
        </h1>

        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 w-16 object-contain rounded-full border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-indigo-700">
                    {company.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{company.location}</p>
                </div>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <p className="text-center mt-10 text-gray-500">No companies found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VadodaraCompanies;
