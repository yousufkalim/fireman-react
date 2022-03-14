import React from "react";
import loading from "../../assets/loading.gif";

function Loader({ ...prop }) {
  if (prop.isLoading === true) {
    return (
      <div className="loading">
        <img src={loading} alt="Loading" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Loader;