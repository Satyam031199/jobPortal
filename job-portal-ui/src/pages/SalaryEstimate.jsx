import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import SalaryCard from "../components/SalaryCard";

const SalaryEstimate = () => {
  const [searchText, setSearchText] = useState("");
  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => setSalaries(data));
  }, []);
  const filteredData = (query) => {
    let filteredSalaries = salaries;
    if (query) {
      filteredSalaries = salaries.filter((salary) => {
        return (
          salary.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
    }
    return filteredSalaries.map((salary, j) => (
      <SalaryCard salary={salary} key={j} />
    ));
  };
  const result = filteredData(searchText);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title="Estimated Salary" path="Salary" />
      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-blue rounded text-white font-semibold px-8 py-2 mb-4 mx-4 hover:bg-black">
            Search
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {result}
      </div>
    </div>
  );
};

export default SalaryEstimate;
