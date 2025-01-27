import React from 'react';

const Contacto = () => {
  return (
    <section className="p-12 bg-white rounded-md shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="flex-1 text-center md:text-left">
          <p className="text-xl text-brown font-serif">
            This project has received funding from the European Union’s Horizon Europe research and innovation programme under grant agreement No GA 101157560
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <span className="text-8xl">🇪🇺</span>
          <p className="text-brown text-lg mt-4 font-serif">Funded by the European Union</p>
        </div>
      </div>
    </section>
  );
};

export default Contacto;g