import React from 'react';

const Contacto = () => {
  return (
    <section className="py-24 bg-white rounded-md shadow-lg">
      <div className="max-w-screen-lg mx-auto px-6 flex flex-col items-center text-center">
        {/* Texto informativo */}
        <p className="text-lg text-gray-700 font-medium leading-relaxed max-w-2xl">
          This project has received funding from the European Union’s Horizon Europe 
          research and innovation programme under grant agreement No GA 101157560
        </p>

        {/* Bandera de la UE debajo del texto */}
        <div className="mt-6">
          <span className="text-7xl md:text-8xl">🇪🇺</span>
          <p className="text-gray-700 text-lg font-medium mt-2">
            Funded by the European Union
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacto;