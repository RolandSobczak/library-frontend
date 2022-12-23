import React from "react";

const BookImage = ({ imgUrl }) => {
  return (
    <img
      src={imgUrl ? imgUrl : "https://via.placeholder.com/100"}
      width="100%"
    />
  );
};

export default BookImage;
