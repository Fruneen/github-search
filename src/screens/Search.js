import logoSearch from "./icons/search.svg";
import "./screens.css";

const Search = () => {
  return (
    <div className="screen-container">
      <img src={logoSearch} alt="Search" />
      <p className="screen-title">
        Start with searching <br></br> a GitHub user
      </p>
    </div>
  );
};

export default Search;
