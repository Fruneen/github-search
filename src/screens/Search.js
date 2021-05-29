import logoSearch from "./icons/search.svg";
import "./screens.css";

const Search = () => {
  return (
    <div className="state-container">
      <img src={logoSearch} alt="Search" />
      <p className="state-title">Start with searching a GitHub user</p>
    </div>
  );
};

export default Search;
