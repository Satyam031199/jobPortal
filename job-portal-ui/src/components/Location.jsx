import React from "react";
import InputField from "./InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <InputField handleChange={handleChange} name='test' value='' title='All'/>
        <InputField handleChange={handleChange} name='test' value='London' title='London'/>
        <InputField handleChange={handleChange} name='test' value='seattle' title='Seattle'/>
        <InputField handleChange={handleChange} name='test' value='madrid' title='Madrid'/>
        <InputField handleChange={handleChange} name='test' value='boston' title='Boston'/>
      </div>
    </div>
  );
};

export default Location;
