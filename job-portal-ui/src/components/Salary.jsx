import React from "react";
import Button from "./Button";
import InputField from "./InputField";

const Salary = ({ handleChange, handleClick }) => {
  const date = new Date()
  const twentyFourHrsAgo = new Date(date - 24*60*60*1000).toISOString().slice(0,10)
  const sevenDaysAgo = new Date(date - 7*24*60*60*1000).toISOString().slice(0,10)
  const thirtyDaysAgo = new Date(date - 30*24*60*60*1000).toISOString().slice(0,10)
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="mb-4">
        <Button handleClick={handleClick} value="Yearly" title="Yearly" />
        <Button handleClick={handleClick} value="Monthly" title="Monthly" />
        <Button handleClick={handleClick} value="Hourly" title="Hourly" />
      </div>
      <div className="mb-4">
      <InputField
          handleChange={handleChange}
          name="test"
          value="10"
          title="> 10k"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="30"
          title="> 30k"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="50"
          title="> 50k"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="80"
          title="> 80k"
        />
      </div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>
      <div className="mb-4">
      <InputField
          handleChange={handleChange}
          name="test"
          value=""
          title="Any"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="Full-time"
          title="Full-time"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="Temporary"
          title="Temporary"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="Part-time"
          title="Part-time"
        />
      </div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div className="mb-4">
      <InputField
          handleChange={handleChange}
          name="test"
          value=""
          title="Any experience"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="Internship"
          title="Internship"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value="Work remotely"
          title="Work remotely"
        />
      </div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div className="mb-4">
      <InputField
          handleChange={handleChange}
          name="test"
          value=""
          title="All time"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value={twentyFourHrsAgo}
          title="Last 24 hours"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value={sevenDaysAgo}
          title="Last 7 days"
        />
        <InputField
          handleChange={handleChange}
          name="test"
          value={thirtyDaysAgo}
          title="Last month"
        />
      </div>
    </div>
  );
};

export default Salary;
