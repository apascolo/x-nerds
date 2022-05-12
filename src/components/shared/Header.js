import React from "react";

export const Header = () => {
  return (
    <header className="flex flex-wrap">
      <div className="container mx-auto">
        <div className="w-full p-3">
          <img
            src="images/logo-x-nerds.png"
            alt="logo x-nerds"
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl w-full p-3 my-5 text-center font-black">
          Evaluación técnica
        </h1>
      </div>
    </header>
  );
};
