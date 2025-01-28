import React from 'react';

// Manually importing all 24 logo images
import logo1 from '../../../assets/partners/1.png';
import logo2 from '../../../assets/partners/2.png';
import logo3 from '../../../assets/partners/3.png';
import logo4 from '../../../assets/partners/4.png';
import logo5 from '../../../assets/partners/5.png';
import logo6 from '../../../assets/partners/6.png';
import logo7 from '../../../assets/partners/7.png';
import logo8 from '../../../assets/partners/8.png';
import logo9 from '../../../assets/partners/9.png';
import logo10 from '../../../assets/partners/10.png';
import logo11 from '../../../assets/partners/11.png';
import logo12 from '../../../assets/partners/12.png';
import logo13 from '../../../assets/partners/13.png';
import logo14 from '../../../assets/partners/14.png';
import logo15 from '../../../assets/partners/15.png';
import logo16 from '../../../assets/partners/16.png';
import logo17 from '../../../assets/partners/17.png';
import logo18 from '../../../assets/partners/18.png';
import logo19 from '../../../assets/partners/19.png';
import logo20 from '../../../assets/partners/20.png';
import logo21 from '../../../assets/partners/21.png';
import logo22 from '../../../assets/partners/22.png';
import logo23 from '../../../assets/partners/23.png';
import logo24 from '../../../assets/partners/24.png';

const Colaboradores = () => {
  // Array to hold the imported logo images
  const logos = [
    logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
    logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19,
    logo20, logo21, logo22, logo23, logo24,
  ];

  return (
    <section className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-brown font-serif">
        Collaborators
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-6 lg:grid-cols-8">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-2 bg-white hover:bg-boreal/10 transition-colors rounded-md"
          >
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-20 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Colaboradores;