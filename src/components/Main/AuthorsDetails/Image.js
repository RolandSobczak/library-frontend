import React from "react";

const AuthorImage = ({ imgUrl }) => {
  return (
    <img
      src={imgUrl ? imgUrl : "https://via.placeholder.com/100"}
      width="100%"
    />
  );
};

export default AuthorImage;
