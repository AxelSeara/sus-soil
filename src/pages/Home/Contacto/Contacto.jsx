import React from 'react';
import fundedLogo from '../../../assets/EN_FundedbytheEU_RGB_BLACK Outline.png';

const Contacto = () => {
  return (
    <section className="py-24 bg-white rounded-md shadow-lg">
      <div className="max-w-screen-lg mx-auto px-6 flex flex-col items-center justify-center">
        <img
          src={fundedLogo}
          alt="Funded by the European Union"
          className="mx-auto h-12 md:h-16"
        />
      </div>
    </section>
  );
};

export default Contacto;