import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
  const onSubmit = async (data) => {
    data.skills = selectedOptions;
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/post-job`,
    data)
    const responseOK = response && response.status === 200 && response.statusText === 'OK';
    if(responseOK){
      toast.success("Job posted successfully")
      reset()
      navigate('/')
    }else{
      toast.error("Could Not post")
    }
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="py-10 px-4 lg:px-16 bg-[#fafafa]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
                required
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
                required
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
                required
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$100k"
                {...register("maxPrice")}
                className="create-job-input"
                required
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input" required>
                <option value="">Choose your salary</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: Seattle"
                {...register("jobLocation")}
                className="create-job-input"
                required
              />
            </div>
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="ex: 2024-03-21"
                {...register("postingDate")}
                className="create-job-input"
                required
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
                required
              >
                <option value="">Choose your experience</option>
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
              defaultValue={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti
              required
            />
          </div>
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your image url https://weshare.com/img.jpg"
                {...register("companyLogo")}
                className="create-job-input"
                required
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
                required
              >
                <option value="">Select your job type</option>
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
              required
              defaultValue="Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              {...register("postedBy")}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              placeholder="Your email"
              required
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded hover:bg-black cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
