import ReposNotFoundLogo from "./icons/reposNotFound.svg";
import "./screens.css";

const ReposNotFound = () => {
  return (
    <div className="screen-container">
      <img src={ReposNotFoundLogo} alt="Repos not found logo" />
      <p className="screen-title">Repository list is empty</p>
    </div>
  );
};

export default ReposNotFound;
