import React from "react";

const SideDetails = ({
  first_name,
  last_name,
  originCountry,
  description,
  born_year,
}) => {
  return (
    <div className="text-center">
      <h1>
        {first_name} {last_name}
      </h1>
      <h2>country: {originCountry}</h2>
      <h2>rok urodzenia: {born_year}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SideDetails;
