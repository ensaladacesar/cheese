import React from "react";
import LoadingGif from "../../img/loading.gif";

const Loading = () => {
  return (
    <div className="loading__container">
      <div className="loading__img">
        <img src={LoadingGif} className="img-fluid" alt="Loading.." />
      </div>
    </div>
  );
};

export default Loading;
