import React, { useState, useEffect } from "react";
import "../styles/index.css";
import { withRouter } from "react-router-dom";

function Repositories(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reposInfo, setReposInfo] = useState([]);
  const [username] = useState(props.username);

  useEffect(() => {
    console.log(
      "FETCH REPOS",
      `https://api.github.com/users/${username}/repos`
    );
    fetch(`https://api.github.com/users/${username}/repos`)
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
  }, [username]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="repos-container">
        <h2 className="repos-container__heading">
          Repositories ({reposInfo.length})
        </h2>
        <div className="repos">
          {reposInfo.map((repo) => {
            return (
              <div className="repos__repo" key={repo.id}>
                <a href={repo.html_url} className="repo__heading">
                  {repo.name}
                </a>
                <p className="repo__description">{repo.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(Repositories);
