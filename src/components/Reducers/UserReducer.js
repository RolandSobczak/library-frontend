import { setHeader } from "../../requests";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      setHeader(action.payload.token);
      delete action.payload.token;
      return action.payload;

    case "LOGOUT":
      sessionStorage.clear();
      return null;

    default:
      throw new Error("Bad action for UserReducer");
  }
};

export default UserReducer;
