import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../components/Sidebar";
import NewsLetter from "../components/NewsLetter";
import axios from "axios";

const Home = () => {
  const [titleQuery, setTitleQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-jobs`);
    setJobs(response.data);
  };
  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const handleTitleChange = (e) => {
    setTitleQuery(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationQuery(e.target.value);
  };

  //Title based filtering
  const filteredItems = jobs.filter((job) => {
    return job.jobTitle.toLowerCase().indexOf(titleQuery.toLowerCase()) !== -1;
  });

  // Radio based filtering
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  //Button based filtering
  const handleClick = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Main function
  const filteredData = (jobs, selected, titleQuery, locationQuery) => {
    let filteredJobs = jobs;
    //If search by title
    if (titleQuery) {
      filteredJobs = filteredItems;
    }
    //If search by category
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          minPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          return (
            jobLocation.toLowerCase() === selected.toLowerCase() ||
            parseInt(minPrice) >= parseInt(selected) ||
            salaryType.toLowerCase() === selected.toLowerCase() ||
            employmentType.toLowerCase() === selected.toLowerCase() ||
            experienceLevel.toLowerCase() === selected.toLowerCase() ||
            postingDate >= selected
          );
        }
      );
    }
    //If search by location
    if (locationQuery) {
      filteredJobs = jobs.filter((job) => {
        return (
          job.jobLocation.toLowerCase().indexOf(locationQuery.toLowerCase()) !==
          -1
        );
      });
    }
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  const result = filteredData(
    jobs,
    selectedCategory,
    titleQuery,
    locationQuery
  );
  return (
    <div>
      <Banner
        titleQuery={titleQuery}
        handleTitleChange={handleTitleChange}
        handleLocationChange={handleLocationChange}
        locationQuery={locationQuery}
      />

      <div className="bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="col-span-2 bg-white p-4 rounded">
          {isLoading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <div className="loader">
              <div className="justify-content-center jimu-primary-loading"></div>
            </div>
          )}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage == 1}>
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
