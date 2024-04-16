import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TableRow = ({job}) => {
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/job/${id}`)
    const responseOK = response && response.status === 200 && response.statusText === 'OK';
    if(responseOK){
      toast.success("Job deleted successfully")
      navigate('/my-job')
    }else{
      toast.error("Could Not delete")
    }
  }
  return (
    <tr key={job._id}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-primary font-medium">
        {job.jobTitle}
      </th>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-primary font-medium">
        {job.companyName}
      </th>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-primary font-medium">
        ${job.minPrice} - ${job.maxPrice}k
      </th>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-primary font-medium">
        <Link to={`/edit-job/${job._id}`}>
          <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-stext-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 rounded">
            Edit
          </button>
        </Link>
      </th>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4 text-left text-primary font-medium">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(job._id)}
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default TableRow;
