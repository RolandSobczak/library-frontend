import React from "react";

const DetailReducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return action.payload;
    case "UPDATE":
      return action.payload;
    default:
      throw new Error("Bad action for DetailReducer");
  }
};

export default DetailReducer;
