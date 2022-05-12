import React, { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const Output = () => {
  const { formData } = useContext(PokemonContext);
  // console.log(formData);

  return (
    <>
      {formData.Name === "" ? (
        <>
          <i className="fa-solid fa-exclamation text-slate-400 sticky top-10"></i>
          <span className="w-full text-slate-400 text-center sticky top-14">
            No hay datos para mostrar
          </span>
        </>
      ) : (
        <pre className="sticky top-10">{JSON.stringify(formData, null, 4)}</pre>
      )}
    </>
  );
};

export default Output;
