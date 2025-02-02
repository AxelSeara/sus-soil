// Colaboradores.jsx
import React from 'react';

// Importamos manualmente los 24 logos
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

// Array de colaboradores con sus logos, URLs y textos alternativos
const collaborators = [
  { logo: logo1, url: "https://www.usc.es", alt: "Universidad de Santiago de Compostela" },
  { logo: logo2, url: "https://www.carm.es", alt: "Región de Murcia" },
  { logo: logo3, url: "https://www.zalf.de", alt: "Agricultural Landscape Research Zalf" },
  { logo: logo4, url: "https://www.uc.pt", alt: "Universidade de Coimbra" },
  { logo: logo5, url: "https://www.unipi.it", alt: "Università di Pisa" },
  { logo: logo6, url: "https://www.utm.rnu.tn", alt: "Université de Tunis El Manar" },
  { logo: logo7, url: "http://www.aua.gr", alt: "Agricultural University of Athens" },
  { logo: logo8, url: "https://www.unsa.ba", alt: "Universidad de Sarajevo" },
  { logo: logo9, url: "https://www.udc.es", alt: "Universidade de Coruña" },
  { logo: logo10, url: "https://www.upm.es", alt: "Politécnica de Madrid" },
  { logo: logo11, url: "https://www.lifewatch.eu", alt: "LifeWatch ERIC" },
  { logo: logo12, url: "https://www.nationalforestcenter.org", alt: "National Forest Center" },
  { logo: logo13, url: "http://www.verdeterre.org", alt: "Ver de Terre" },
  { logo: logo14, url: "http://www.venetiancluster.it", alt: "Venetian Cluster" },
  { logo: logo15, url: "https://www.luke.fi", alt: "Luke National Resource Institute Finland" },
  { logo: logo16, url: "https://www.pefc.org", alt: "PEFC" },
  { logo: logo17, url: "http://www.feuga.org", alt: "Feuga Fundación Empresa Universidad Coruña" },
  { logo: logo18, url: "https://www.ciheam.org", alt: "CIHEAM Bari" },
  { logo: logo19, url: "https://www.cu.edu.tr", alt: "Çukurova University" },
  { logo: logo20, url: "https://www.senseen.eu", alt: "Senseen" },
  { logo: logo21, url: "https://www.wetseus.com", alt: "Wetseus" },
  { logo: logo22, url: "https://www.husd.edu.eg", alt: "Heliopolis University for Sustainable Development" },
  { logo: logo23, url: "https://www.carqueixasabordosancares.pt", alt: "Carqueixa Sabor dos Ancares" },
  { logo: logo24, url: "https://www.afg.gal", alt: "AFG Asociación Forestal Galicia" },
];

const Colaboradores = () => {
  return (
    <section className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
      {/* Sección de Colaboradores */}
      <h2 className="text-3xl font-bold text-center mb-8 text-brown">
        Collaborators
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-6 lg:grid-cols-8">
        {collaborators.map((collab, index) => (
          <a
            key={index}
            href={collab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 bg-white hover:bg-green-100 transition-colors rounded-md transform hover:scale-105"
          >
            <img
              src={collab.logo}
              alt={collab.alt}
              className="h-20 object-contain"
            />
          </a>
        ))}
      </div>

      {/* Sección de Contacto Simplificada */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4 text-brown">
          Contact Us
        </h3>
        <p className="text-gray-700 mb-2">
          For inquiries, please email us at{' '}
          <a
            href="mailto:contact@example.com"
            className="text-green-700 hover:underline"
          >
            contact@example.com
          </a>
        </p>
        <p className="text-gray-700">
          Or call us at <span className="font-semibold">+1 (234) 567-890</span>
        </p>
      </div>
    </section>
  );
};

export default Colaboradores;