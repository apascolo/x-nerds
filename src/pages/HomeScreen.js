import { useState } from "react";
import { FormDymanic } from "../components/FormDymanic";
import Output from "../components/Output";
import { Header } from "../components/shared/Header";
import { PokemonContext } from "../contexts/PokemonContext";

import formJson from "../data/pokemon.json";

export const HomeScreen = () => {
  const [formData, setFormData] = useState({});

  return (
    <PokemonContext.Provider value={{ formData, setFormData }}>
      <Header />
      <div className="container mx-auto">
        <main className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-3">
            <FormDymanic {...formJson} />
          </div>
          <div
            className="w-full md:w-1/2 p-10 mx-3 md:mx-0 my-3 flex flex-col items-center rounded-2xl bg-zinc-800 shadow-inner"
            id="screenOutput"
          >
            <Output {...formData} />
          </div>
        </main>
      </div>
    </PokemonContext.Provider>
  );
};
