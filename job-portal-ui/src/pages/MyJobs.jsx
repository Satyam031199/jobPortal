import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TableRow from "../components/TableRow";
import { UserAuth } from "../context/AuthContext";

const MyJobs = () => {
  const { user } = UserAuth();
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/all-jobs/${user.email}`
    );
    setJobs(response.data);
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [fetchData]);
  const filteredData = (query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = jobs.filter((job) => {
        return (
          job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
    }
    return filteredJobs.map((job, j) => <TableRow job={job} key={j} />);
  };
  const result = filteredData(searchText)
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4">My Jobs</h1>
        <div className="p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue font-semibold text-white px-8 py-2 rounded mb-4 ml-4 hover:bg-black"
          >
            Search
          </button>
        </div>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-2 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Post A New Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-light text-left">
                      title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-light text-left">
                      company name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-light text-left">
                      salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-light text-left">
                      edit
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-light text-left">
                      delete
                    </th>
                  </tr>
                </thead>

                <tbody>{result}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyJobs;
