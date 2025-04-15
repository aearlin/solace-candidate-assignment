"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const [searchTerms, setSearchTerms] = useState({
    firstName: "",
    lastName: "",
    city: "",
    degree: "",
    specialties: "",
    yearsOfExperience: "",
  });
  
  useEffect(() => {
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerms.firstName.toLowerCase()) &&
        advocate.lastName.toLowerCase().includes(searchTerms.lastName.toLowerCase()) &&
        advocate.city.toLowerCase().includes(searchTerms.city.toLowerCase()) &&
        advocate.degree.toLowerCase().includes(searchTerms.degree.toLowerCase()) &&
        advocate.specialties.some((spec) =>
          spec.toLowerCase().includes(searchTerms.specialties.toLowerCase())
        ) &&
        advocate.yearsOfExperience.toString().includes(searchTerms.yearsOfExperience)
      );
    });
    setFilteredAdvocates(filtered);
  }, [searchTerms, advocates]);
  
  const handleSearchChange = (field) => (e) => {
    setSearchTerms((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  
  const resetSearch = () => {
    setSearchTerms({
      firstName: "",
      lastName: "",
      city: "",
      degree: "",
      specialties: "",
      yearsOfExperience: "",
    });
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Search Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={searchTerms.firstName}
            onChange={handleSearchChange("firstName")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={searchTerms.lastName}
            onChange={handleSearchChange("lastName")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="City"
            value={searchTerms.city}
            onChange={handleSearchChange("city")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Degree"
            value={searchTerms.degree}
            onChange={handleSearchChange("degree")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Specialties"
            value={searchTerms.specialties}
            onChange={handleSearchChange("specialties")}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Years of Experience"
            value={searchTerms.yearsOfExperience}
            onChange={handleSearchChange("yearsOfExperience")}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          onClick={resetSearch}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Reset All
        </button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            const key =
              advocate.email ||
              advocate.phoneNumber ||
              `${advocate.firstName}-${advocate.lastName}`;

            return (
              <React.Fragment key={key}>
                <tr>
                  <td colSpan={7}>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>{advocate.firstName}</td>
                  <td>{advocate.lastName}</td>
                  <td>{advocate.city}</td>
                  <td>{advocate.degree}</td>
                  <td>
                    {advocate.specialties.map((s, i) => (
                      <div key={`${key}-specialty-${i}`}>{s}</div>
                    ))}
                  </td>
                  <td>{advocate.yearsOfExperience}</td>
                  <td>{advocate.phoneNumber}</td>
                </tr>
                <tr>
                  <td colSpan={7}>
                    <hr />
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
