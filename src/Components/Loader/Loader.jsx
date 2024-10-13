import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cyan",
};

const Loader = () => {
  const [loading] = useState(true);
  const [color] = useState("#00bfff");

  return (
    <div className="sweet-loading">
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
