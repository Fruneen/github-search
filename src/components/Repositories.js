import React, { useState, useEffect } from "react";
import "../styles/index.css";
import Loader from "../service/loader.js";
import ReposNotFoundLogo from "../images/reposNotFound.svg";
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
  const pageCount = Math.ceil(reposInfo.length / perPage);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
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
            previousLabel={<Prev />}
            nextLabel={<Next />}
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
function ReposNotFound() {
  return (
    <div
      className="state-container"
      style={{ width: "720px", minHeight: "70vh" }}
    >
      <img src={ReposNotFoundLogo} alt="Repos not found logo" />
      <p className="state-title">Repository list is empty</p>
    </div>
  );
}

const Next = () => {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L6 6L1 11" stroke="#808080" strokeWidth="2" />
    </svg>
  );
};

const Prev = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="12"
      fill="none"
      viewBox="0 0 8 12"
    >
      <path
        fill="#808080"
        fillRule="evenodd"
        d="M3.414 6l4.293-4.293L6.293.293.586 6l5.707 5.707 1.414-1.414L3.414 6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
export default withRouter(Repositories);
