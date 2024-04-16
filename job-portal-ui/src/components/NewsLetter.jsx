import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const handleNewsletter = async () => {
    if(!email){
        toast.error('Email is required')
        return
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/send-email`, {
      email,
    });
    const responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      toast.success(`Check your inbox`);
      toast.success(`Newsletter sent to ${email}`);
    } else {
      toast.error("Could Not post");
    }
  };
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Updates for new jobs
        </h3>
        <p className="text-primary/70 text-base mb-4">
          Subscribe to our NewsLetter for getting all updates on new jobs and
          opportunities.
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@email.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="submit"
            value="Subscribe"
            className="mt-5 tracking-wide font-semibold bg-blue text-white w-full py-2 rounded-lg hover:bg-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none login-btn text-base cursor-pointer"
            onClick={handleNewsletter}
          />
        </div>
      </div>
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/70 text-base mb-4">
          Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo
          ea foes.
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
