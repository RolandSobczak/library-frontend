import React, { useEffect, useState } from "react";

const DateRangeFilter = ({ minDate, setMinDate, maxDate, setMaxDate }) => {
  const handleChangeDate = (e, setState) => setState(e.target.value);

  return (
    <div className="d-flex justify-content-center">
      <input
        type="date"
        className="m-3"
        value={minDate}
        onChange={(e) => handleChangeDate(e, setMinDate)}
      />
      <input
        type="date"
        className="m-3"
        value={maxDate}
        onChange={(e) => handleChangeDate(e, setMaxDate)}
      />
    </div>
  );
};

export default DateRangeFilter;
