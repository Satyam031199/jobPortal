import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";

const EditJob = () => {
  const navigate = useNavigate()
  const [job, setJob] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useParams()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [selectedOptions, setSelectedOptions] = useState(null);
  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React.js", label: "React.js" },
    { value: "Node", label: "Node" },
    { value: "Firebase", label: "Firebase" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/edit-job/${id}`
      );
      setJob(response.data);
      reset()
    };
    fetchData();
    setIsLoading(false);
  },[id,reset]);
  const onSubmit = async (data) => {
    data.skills = selectedOptions
    if(data.skills===null){
      toast.error("Fill the required skills")
      return
    }
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/update-job/${id}`,data)
    console.log(response);
    const responseOK = response && response.status === 200;
    if(responseOK){
      toast.success("Job updated successfully")
      reset()
      navigate('/my-job')
    }else{
      toast.error("Could Not update")
    }
  }
  return(
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="py-10 px-4 lg:px-16 bg-[#fafafa]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={job.jobTitle}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={job.companyName}
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                defaultValue={job.minPrice}
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                defaultValue={job.maxPrice}
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={job.salaryType}>{job.salaryType}</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                defaultValue={job.jobLocation}
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={job.postingDate}
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={job.experienceLevel}>{job.experienceLevel}</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
                <option value="Any experience">Any experience</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg">Required Skill Set</label>
            <CreatableSelect
              className="create-job-input py-4"
              defaultValue={job.skills}
              onChange={setSelectedOptions}
              options={options}
              isMulti
            />
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                defaultValue={job.companyLogo}
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={job.employmentType}>{job.employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description")}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              defaultValue={job.description}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              {...register("postedBy")}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              defaultValue={job.postedBy}
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded"
          />
        </form>
      </div>
    </div>
  )
};

export default EditJob;
