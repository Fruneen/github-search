import React, { useState, useEffect } from "react";
import Loader from "../../screens/Loader";
import ReposNotFound from "../../screens/ReposNotFound";
import Next from "./icons/next.svg";
import Prev from "./icons/prev.svg";
import "./repositories.css";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";

function Repositories(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reposInfo, setReposInfo] = useState([]);
  const [username] = useState(props.username);
  const [currentPage, setCurrentPage] = useState(0);
  let URL = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {
    console.log("FETCH REPOS", URL);
    handleFetch(URL);
  }, [URL]);

  const handleFetch = (URL) => {
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setReposInfo(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const perPage = 3;
  const reposLength = reposInfo.length;
  const offset = currentPage * perPage;
  const pageCount = Math.ceil(reposInfo.length / perPage);
  const currentPageData = reposInfo
    .slice(offset, offset + perPage)
    .map((repo) => {
      return (
        <div className="repos__repo" key={repo.id}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="repo__heading"
          >
            {repo.name}
          </a>
          <p className="repo__description">{repo.description}</p>
        </div>
      );
    });

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (!reposInfo.length) {
    return (
      <div>
        {" "}
        <ReposNotFound />
      </div>
    );
  } else {
    return (
      <div className="repos-container">
        <h2 className="repos-container__heading">
          Repositories ({reposInfo.length})
        </h2>
        <div className="repos"> {currentPageData}</div>
        <div className="paginate">
          <CountPages
            reposLength={reposLength}
            currentPage={currentPage}
            perPage={perPage}
          />
          <ReactPaginate
            marginPagesDisplayed={1}
            previousLabel={<img src={Prev} alt="prev" />}
            nextLabel={<img src={Next} alt="prev" />}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"container"}
            previousLinkClassName={"previous"}
            nextLinkClassName={"next"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
const CountPages = (props) => {
  let startPage = (1 + props.currentPage) * props.perPage - props.perPage + 1;
  let endPage = (1 + props.currentPage) * props.perPage;
  if (endPage > props.reposLength) endPage = props.reposLength;
  return (
    <p className="paginate-legend">
      {startPage}-{endPage} of {props.reposLength}
    </p>
  );
};

export default withRouter(Repositories);
