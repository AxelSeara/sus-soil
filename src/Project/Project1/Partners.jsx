import React from 'react';

// Import logos
import p1 from '../../../src/assets/partners/1.png';  // USC
import p2 from '../../../src/assets/partners/2.png';  // Región de Murcia
import p3 from '../../../src/assets/partners/3.png';  // ZALF
import p4 from '../../../src/assets/partners/4.png';  // Universidade de Coimbra
import p5 from '../../../src/assets/partners/5.png';  // Università di Pisa
import p6 from '../../../src/assets/partners/6.png';  // Université de Tunis El Manar
import p7 from '../../../src/assets/partners/7.png';  // Geoponiko Panepistimion Athinon
import p8 from '../../../src/assets/partners/8.png';  // Univerzitet u Sarajevu
import p9 from '../../../src/assets/partners/9.png';  // Universidade da Coruña
import p10 from '../../../src/assets/partners/10.png'; // Universidad Politécnica de Madrid
import p11 from '../../../src/assets/partners/11.png'; // Lifewatch
import p12 from '../../../src/assets/partners/12.png'; // Narodne Lesnicke Centrum
import p13 from '../../../src/assets/partners/13.png'; // Ver de Terre Production
import p14 from '../../../src/assets/partners/14.png'; // Venetian Cluster
import p15 from '../../../src/assets/partners/15.png'; // Luonnonvarakeskus (Finland)
import p16 from '../../../src/assets/partners/16.png'; // PEFC Italia
import p17 from '../../../src/assets/partners/17.png'; // FEUGA
import p18 from '../../../src/assets/partners/18.png'; // CIHEAM
import p19 from '../../../src/assets/partners/19.png'; // Cukurova
import p20 from '../../../src/assets/partners/20.png'; // senseen (optional)
import p21 from '../../../src/assets/partners/21.png'; // wetsus (optional)
import p22 from '../../../src/assets/partners/22.png'; // Heliopolis
import p23 from '../../../src/assets/partners/23.png'; // A Carqueixa
import p24 from '../../../src/assets/partners/24.png'; // Asociación Forestal de Galicia
import p25 from '../../../src/assets/partners/25.png'; // Larenstein University of Applied Sciences (optional)

// Optional: create a reusable LogoBox component for consistency
function LogoBox({ src, alt }) {
  return (
    <div className="logo-box flex items-center justify-center w-24 h-16 md:w-28 md:h-20 shrink-0">
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

const coordinator = {
  title: 'Universidade de Santiago de Compostela',
  subtitle: 'Spain',
  img: p1,
  url: 'https://www.usc.gal/en'
};

const beneficiaries = [
  { title: 'Región de Murcia', subtitle: 'Spain', img: p2, url: 'https://www.carm.es/' },
  { title: 'Leibniz-Zentrum Fuer Agrarlandschaftsforschung (ZALF)', subtitle: 'Germany', img: p3, url: 'https://www.zalf.de/en/Pages/ZALF.aspx' },
  { title: 'Universidade de Coimbra', subtitle: 'Portugal', img: p4, url: 'https://www.uc.pt/en/' },
  { title: 'Università di Pisa', subtitle: 'Italy', img: p5, url: 'https://www.unipi.it/index.php/english' },
  { title: 'Université de Tunis El Manar', subtitle: 'Tunisia', img: p6, url: 'https://utm.rnu.tn/utm/fr/' },
  { title: 'Geoponiko Panepistimion Athinon', subtitle: 'Greece', img: p7, url: 'https://www2.aua.gr/en' },
  { title: 'Univerzitet u Sarajevu', subtitle: 'Bosnia and Herzegovina', img: p8, url: 'https://www.unsa.ba/en' },
  { title: 'Universidade da Coruña', subtitle: 'Spain', img: p9, url: 'https://www.udc.es/en/' },
  { title: 'Universidad Politécnica de Madrid', subtitle: 'Spain', img: p10, url: 'https://www.upm.es/internacional' },
  { title: 'E-Science European Infrastructure for Biodiversity and Ecosystem Research (Lifewatch)', subtitle: 'Spain', img: p11, url: 'https://www.lifewatch.eu/' },
  { title: 'Narodne Lesnicke Centrum', subtitle: 'Slovakia', img: p12, url: 'https://web.nlcsk.org/en/home-en/' },
  { title: 'Ver de Terre Production', subtitle: 'France', img: p13, url: 'https://www.verdeterreprod.fr/' },
  { title: 'Venetian Cluster', subtitle: 'Italy', img: p14, url: 'https://www.venetiancluster.eu/en/' },
  { title: 'Luonnonvarakeskus', subtitle: 'Finland', img: p15, url: 'https://www.luke.fi/en' },
  { title: 'Programme for the Endorsement of Forest Certification Schemes Italia', subtitle: 'Italy', img: p16, url: 'https://www.pefc.it/' },
  { title: 'Fundación Empresa Universidad Gallega (FEUGA)', subtitle: 'Spain', img: p17, url: 'https://www.feuga.es/en/' },
  { title: 'Centro Internazionale di Altistudi Agronomici Mediterranei (CIHEAM)', subtitle: 'Italy', img: p18, url: 'https://www.iamb.ciheam.org/' },
  { title: 'University of Çukurova', subtitle: 'Turkey', img: p19, url: 'https://www.cu.edu.tr/en/' },
  { title: 'Heliopolis University Association', subtitle: 'Egypt', img: p22, url: 'https://hu.edu.eg/' },
  { title: 'Larenstein University of Applied Sciences', subtitle: 'The Netherlands', img: p25, url: 'https://www.vhluas.com/' },
  // Optional entries:
  // { title: 'Senseen', subtitle: 'Spain', img: p20, url: 'https://senseen.io/' },
  // { title: 'Wetsus', subtitle: 'The Netherlands', img: p21, url: 'https://www.wetsus.nl/' }
];

const associatedPartners = [
  { title: 'A Carqueixa', subtitle: 'Spain', img: p23, url: 'https://www.osabordosancares.com/' },
  { title: 'Asociación Forestal de Galicia (AFG)', subtitle: 'Spain', img: p24, url: 'https://asociacionforestal.gal/en/' }
];

export default function Partners() {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-4 text-brown">
      <h1 className="text-5xl font-bold text-center mb-10">Project Partners</h1>
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
        SUS-SOIL is coordinated by the University of Santiago de Compostela (USC) from Spain,
        and concentrates 22 partners from 13 countries across Europe and North Africa.
      </p>

      {/* Coordinator Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Coordinator</h2>
        <a href={coordinator.url} target="_blank" rel="noopener noreferrer">
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4 hover:bg-lightGreen/10 transition-colors">
            <LogoBox src={coordinator.img} alt={coordinator.title} />
            <div>
              <h3 className="text-xl font-bold">{coordinator.title}</h3>
              <p className="text-lg text-darkGreen">{coordinator.subtitle}</p>
            </div>
          </div>
        </a>
      </section>

      {/* Beneficiaries Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Beneficiaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficiaries.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4 hover:bg-lightGreen/10 transition-colors"
            >
              <LogoBox src={partner.img} alt={partner.title} />
              <div>
                <h3 className="text-xl font-bold">{partner.title}</h3>
                <p className="text-lg text-darkGreen">{partner.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Associated Partners Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Associated Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {associatedPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4 hover:bg-lightGreen/10 transition-colors"
              >
                <LogoBox src={partner.img} alt={partner.title} />
                <div>
                  <h3 className="text-xl font-bold">{partner.title}</h3>
                  <p className="text-lg text-darkGreen">{partner.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
      </section>
    </div>
  );
}
