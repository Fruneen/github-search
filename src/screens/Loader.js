import "./screens.css";

const Loader = () => {
  return (
    <div className="screen-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        version="1.1"
        height="30"
        width="130"
      >
        <circle cx="15" cy="15" r="15" fill="#0064eb">
          <animate
            attributeName="opacity"
            begin="0.1"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </circle>
        <circle cx="65" cy="15" r="15" fill="#0064eb">
          <animate
            attributeName="opacity"
            begin="0.2"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </circle>
        <circle cx="115" cy="15" r="15" fill="#0064eb">
          <animate
            attributeName="opacity"
            begin="0.3"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
