// src/Project/Project1/Colaboradores.jsx
import React from 'react';

// Importa tus 24 logos (ajusta la ruta si difiere)
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
import logo25 from '../../../assets/partners/25.png';

// Array de colaboradores con sus logos, URLs y textos alternativos
const collaborators = [
  { logo: logo1, alt: 'Universidad de Santiago de Compostela', url: 'https://www.usc.gal/en' },
  { logo: logo2, alt: 'Región de Murcia', url: 'https://www.carm.es/' },
  { logo: logo3, alt: 'Agricultural Landscape Research Zalf', url: 'https://www.zalf.de/en/Pages/ZALF.aspx' },
  { logo: logo4, alt: 'Universidade de Coimbra', url: 'https://www.uc.pt/en/' },
  { logo: logo5, alt: 'Università di Pisa', url: 'https://www.unipi.it/index.php/english' },
  { logo: logo6, alt: 'Université de Tunis El Manar', url: 'https://utm.rnu.tn/utm/fr/' },
  { logo: logo7, alt: 'Agricultural University of Athens', url: 'https://www2.aua.gr/en' },
  { logo: logo8, alt: 'Universidad de Sarajevo', url: 'https://www.unsa.ba/en' },
  { logo: logo9, alt: 'Universidade de Coruña', url: 'https://www.udc.es/en/' },
  { logo: logo10, alt: 'Politécnica de Madrid', url: 'https://www.upm.es/internacional' },
  { logo: logo11, alt: 'LifeWatch ERIC', url: 'https://www.lifewatch.eu/' },
  { logo: logo12, alt: 'National Forest Center', url: 'https://web.nlcsk.org/en/home-en/' },
  { logo: logo13, alt: 'Ver de Terre', url: 'https://www.verdeterreprod.fr/' },
  { logo: logo14, alt: 'Venetian Cluster', url: 'https://www.venetiancluster.eu/en/' },
  { logo: logo15, alt: 'Luke National Resource Institute Finland', url: 'https://www.luke.fi/en' },
  { logo: logo16, alt: 'PEFC', url: 'https://www.pefc.it/' },
  { logo: logo17, alt: 'Feuga Fundación Empresa Universidad Coruña', url: 'https://www.feuga.es/en/' },
  { logo: logo18, alt: 'CIHEAM Bari', url: 'https://www.iamb.ciheam.org/' },
  { logo: logo19, alt: 'Çukurova University', url: 'https://www.cu.edu.tr/en/' },
  { logo: logo20, alt: 'Senseen', url: 'https://senseen.io/' },
  // { logo: logo21, alt: 'Wetseus', url: 'https://www.wetsus.nl/' },
  { logo: logo22, alt: 'Heliopolis University for Sustainable Development', url: 'https://hu.edu.eg/' },
  { logo: logo25, alt: 'Larenstein University of Applied Sciences – The Netherlands ', url: 'https://www.vhluas.com/' },
  { logo: logo23, alt: 'Carqueixa Sabor dos Ancares', url: 'https://www.osabordosancares.com/' },
  { logo: logo24, alt: 'AFG Asociación Forestal Galicia', url: 'https://asociacionforestal.gal/en/' },

];

export default function Colaboradores() {
  return (
    <section className="container mx-auto px-6 py-16 bg-white rounded-lg shadow-md mb-16">
      {/* Título */}
      <h2 className="text-3xl font-bold text-center mb-8 text-brown">
        Consortium
      </h2>

      {/* Grid de logos */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {collaborators.map((collab, index) => (
          <a
            key={index}
            href={collab.url}
            target="_blank"
            rel="noopener noreferrer"
            title={collab.alt}
            className="flex items-center justify-center p-2 bg-white 
                       hover:bg-lightGreen/20 transition-colors
                       rounded-md transform hover:scale-105"
          >
            <img
              src={collab.logo}
              alt={collab.alt}
              className="h-16 md:h-20 object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}