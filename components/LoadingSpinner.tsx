import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className={"flex flex-col justify-center items-center gap-y-4 w-full h-screen"}>
      <div className="spinner"/>
      Laden...
    </div>
  )
};

export default LoadingSpinner;
