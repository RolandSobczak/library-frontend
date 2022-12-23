import React from "react";

const ListReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR":
      return [];
    case "ADD":
      return [...state, action.payload];

    case "FETCH":
      const ids = state.map((obj) => obj.id);
      const newData = action.payload.filter((obj) => !ids.includes(obj.id));
      return [...state, ...newData];

    case "UPDATE":
      const updatedState = state.map((obj) => {
        if (obj.id === action.payload.id) return action.payload;
        return obj;
      });
      return updatedState;

    case "PARTIAL_UPDATE":
      const newState = state.map((collection) => {
        if (collection.id === action.payload.id) {
          collection[action.payload.fieldName] = action.payload.newValue;
        }
        return collection;
      });
      return newState;

    case "REMOVE":
      const data = state.filter((obj) =>
        Array.isArray(action.payload.id)
          ? !action.payload.id.includes(obj.id)
          : obj.id !== action.payload.id
      );
      return data;
    default:
      throw new Error("Bad action for BookReducer");
  }
};

export default ListReducer;
