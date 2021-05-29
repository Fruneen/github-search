import ReposNotFoundLogo from "./icons/reposNotFound.svg";
import "./screens.css";

const ReposNotFound = () => {
  return (
    <div
      className="state-container"
      style={{ width: "720px", minHeight: "70vh" }}
    >
      <img src={ReposNotFoundLogo} alt="Repos not found logo" />
      <p className="state-title">Repository list is empty</p>
    </div>
  );
};

export default ReposNotFound;
