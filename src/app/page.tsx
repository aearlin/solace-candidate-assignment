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
          spec.toLowerCase().includes(searchTerms.specialties.toLowerCase()) &&
        advocate.yearsOfExperience.toString().includes(searchTerms.yearsOfExperience)
        )
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
      <div>
        <p>Search Filters</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          <input placeholder="First Name" value={searchTerms.firstName} onChange={handleSearchChange("firstName")} />
          <input placeholder="Last Name" value={searchTerms.lastName} onChange={handleSearchChange("lastName")} />
          <input placeholder="City" value={searchTerms.city} onChange={handleSearchChange("city")} />
          <input placeholder="Degree" value={searchTerms.degree} onChange={handleSearchChange("degree")} />
          <input placeholder="Specialties" value={searchTerms.specialties} onChange={handleSearchChange("specialties")} />
          <input placeholder="Years of Experience" value={searchTerms.yearsOfExperience} onChange={handleSearchChange("yearsOfExperience")} />
        </div>
        <br />
        <button onClick={resetSearch}>Reset All</button>
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
