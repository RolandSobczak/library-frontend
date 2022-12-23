import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppProvider";

const ProfileLink = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const clickHandler = () => navigate("/profile");

  return (
    <img
      src={user.profile.image}
      alt="mdo"
      width="32"
      height="32"
      className="rounded-circle ms-2"
      onClick={clickHandler}
    />
  );
};

export default ProfileLink;
