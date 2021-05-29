import userNotFoundLogo from "./icons/userNotFound.svg";
import "./screens.css";

const UserNotFound = () => {
  return (
    <div className="state-container">
      <img src={userNotFoundLogo} alt="User not found logo" />
      <p className="state-title">User not found</p>
    </div>
  );
};

export default UserNotFound;
