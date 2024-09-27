import React from 'react';

const Contacto = () => {
  return (
    <section className="bg-gray-100 p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 text-center md:text-left">
          <p className="text-lg text-gray-800">
            This project has received funding from the European Union’s Horizon Europe research and innovation programme under grant agreement No GA 101157560
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <span className="text-6xl">🇪🇺</span>
          <p className="text-gray-800 mt-2">Funded by the European Union</p>
        </div>
      </div>
    </section>
  );
};

export default Contacto;