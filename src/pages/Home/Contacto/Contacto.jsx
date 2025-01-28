import React from 'react';

const Contacto = () => {
  return (
    <section className="py-12 bg-white rounded-md shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Texto informativo */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-xl text-brown font-serif">
            This project has received funding from the European Union’s Horizon Europe research 
            and innovation programme under grant agreement No GA 101157560
          </p>
        </div>
        {/* Sección con la bandera y la leyenda */}
        <div className="flex flex-col items-center md:items-end">
          <span className="text-6xl md:text-8xl">🇪🇺</span>
          <p className="text-brown text-lg mt-4 font-serif text-center md:text-right">
            Funded by the European Union
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacto;