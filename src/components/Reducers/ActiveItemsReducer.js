import React from "react";

const ActiveItemsReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      if (state.findIndex((e) => e === action.payload) > -1) {
        return [...state, action.payload];
      }
      return state;
    case "REMOVE":
      const index = state.findIndex((e) => e === action.payload);
      let newState = state;
      if (index > -1) {
        newState = state.filter((e) => e !== action.payload);
      }
      return newState;
    case "TOGGLE":
      const elementIndex = state.findIndex((e) => e === action.payload);
      let data = state;
      if (elementIndex > -1) {
        data = state.filter((e) => e !== action.payload);
      } else {
        data = [...state, action.payload];
      }
      return data;
    default:
      throw new Error("Bad action for ActiveItemsReducer");
  }
};

export default ActiveItemsReducer;
