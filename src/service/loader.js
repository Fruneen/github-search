// 0064eb
function Loader() {
  return (
    <div
      style={{
        width: "300px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-30%, -40%)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        version="1.1"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
      >
        <circle cx="6" cy="50" r="5" fill="#0064eb">
          <animate
            attributeName="opacity"
            begin="0.1"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </circle>
        <circle cx="26" cy="50" r="5" fill="#0064eb">
          <animate
            attributeName="opacity"
            begin="0.2"
            dur="1s"
            repeatCount="indefinite"
            values="0;1;0"
          ></animate>
        </circle>
        <circle cx="46" cy="50" r="5" fill="#0064eb">
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
}

export default Loader;
