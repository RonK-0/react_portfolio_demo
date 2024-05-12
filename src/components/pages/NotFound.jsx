import React from "react";

const NotFound = () => {
  return (
    <div className="f-col-center w-full h-screen gap-6">
      <h2 className="text-4xl text-green-700 font-mono">Page Not Found</h2>
      <img src="https://media.tenor.com/i3Qc4TdcXwMAAAAi/duck-meme.gif" alt="duck jumping gif" className="h-1/2 invert" />
      <div className="text-center">
        <p className="text-violet-500 font-mono text-xl font-bold m-0 leading-none">Go Back or Go Look Somewhere Else</p>
        <small className="text-lg text-yellow-400 font-mono m-0 leading-none">Thanks</small>
      </div>
    </div>
  );
};

export default NotFound;
