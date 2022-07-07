import React from "react";

const Loading = () => {
  return (
    <div className="d-flex"  style={{ width: "100%", margin:"0 42%"}}>
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "50px", height: "50px" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
