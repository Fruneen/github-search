import React, { useState, useEffect } from "react";
import Repositories from "./Repositories";
import Loader from "../service/loader.js";
import "../styles/index.css";
import userNotFoundLogo from "../images/userNotFound.svg";
import { withRouter, useParams } from "react-router-dom";

function User(props) {
  const params = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [info, setInfo] = useState([]);
  const [username, setUsername] = useState(props.username);
  const URL = `https://api.github.com/users/${username}`;

  useEffect(() => {
    if (props.username !== "undefined") {
      setUsername(params.id);
    } else setUsername(props.username);
  }, [props.username, params.id]);

  useEffect(() => {
    console.log("FETCH USER", URL);
    setIsLoaded(false);
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setInfo(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [URL]);

  if (username !== params.id) setUsername(params.id);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (
    info.message === "Not Found" ||
    info.login === "undefined" ||
    username === "undefined"
  ) {
    return (
      <div>
        {" "}
        <UserNotFound />
      </div>
    );
  } else {
    return (
      <div className="profile">
        <div className="profile-info">
          <img
            src={info.avatar_url}
            className="profile-info__image"
            alt="Avatar"
          ></img>
          <h2 className="profile-info__name">{info.name}</h2>
          <a
            href={info.html_url}
            className="profile-info__login"
            rel="noreferrer"
            target="_blank"
          >
            {info.login}
          </a>
          <div className="follow-container">
            <span className="profile-info__followers">
              <svg
                className="person-icon"
                width="23"
                height="15"
                viewBox="0 0 23 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.028 3.73877C10.028 5.39877 8.69338 6.73877 7.02764 6.73877C5.3619 6.73877 4.01726 5.39877 4.01726 3.73877C4.01726 2.07877 5.3619 0.73877 7.02764 0.73877C8.69338 0.73877 10.028 2.07877 10.028 3.73877ZM18.0557 3.73877C18.0557 5.39877 16.7211 6.73877 15.0553 6.73877C13.3896 6.73877 12.0449 5.39877 12.0449 3.73877C12.0449 2.07877 13.3896 0.73877 15.0553 0.73877C16.7211 0.73877 18.0557 2.07877 18.0557 3.73877ZM7.02764 8.73877C4.68958 8.73877 0.00341797 9.90877 0.00341797 12.2388V13.7388C0.00341797 14.2888 0.454975 14.7388 1.00688 14.7388H13.0484C13.6003 14.7388 14.0519 14.2888 14.0519 13.7388V12.2388C14.0519 9.90877 9.3657 8.73877 7.02764 8.73877ZM14.082 8.78877C14.4332 8.75877 14.7643 8.73877 15.0553 8.73877C17.3934 8.73877 22.0795 9.90877 22.0795 12.2388V13.7388C22.0795 14.2888 21.628 14.7388 21.0761 14.7388H15.8782C15.9885 14.4288 16.0588 14.0888 16.0588 13.7388V12.2388C16.0588 10.7688 15.266 9.65877 14.1221 8.82877C14.1191 8.82574 14.116 8.8218 14.1127 8.81749C14.1051 8.80758 14.096 8.79574 14.082 8.78877Z"
                  fill="#808080"
                />
              </svg>
              {info.followers} followers
            </span>
            <span className="profile-info__following">
              <svg
                className="person-icon"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0553 4.73877C12.0553 6.94877 10.2591 8.73877 8.04148 8.73877C5.82383 8.73877 4.02763 6.94877 4.02763 4.73877C4.02763 2.52877 5.82383 0.73877 8.04148 0.73877C10.2591 0.73877 12.0553 2.52877 12.0553 4.73877ZM0.0137939 14.7388C0.0137939 12.0788 5.36224 10.7388 8.04148 10.7388C10.7207 10.7388 16.0692 12.0788 16.0692 14.7388V15.7388C16.0692 16.2888 15.6176 16.7388 15.0657 16.7388H1.01725C0.465351 16.7388 0.0137939 16.2888 0.0137939 15.7388V14.7388Z"
                  fill="#808080"
                />
              </svg>
              {info.following} following
            </span>
          </div>
        </div>
        <Repositories username={username} />
      </div>
    );
  }
}

function UserNotFound() {
  return (
    <div className="state-container">
      <img src={userNotFoundLogo} alt="User not found logo" />
      <p className="state-title">User not found</p>
    </div>
  );
}

export default withRouter(User);
