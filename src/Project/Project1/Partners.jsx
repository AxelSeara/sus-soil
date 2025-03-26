import React from 'react';

// Importamos los logos
import p1 from '../../../src/assets/partners/1.png';  // USC
import p2 from '../../../src/assets/partners/2.png';  // Región de Murcia
import p3 from '../../../src/assets/partners/3.png';  // ZALF (Leibniz-Zentrum...)
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
import p20 from '../../../src/assets/partners/20.png'; // senseen (si lo necesitas)
import p21 from '../../../src/assets/partners/21.png'; // wetsus (si lo necesitas)
import p22 from '../../../src/assets/partners/22.png'; // Heliopolis
import p23 from '../../../src/assets/partners/23.png'; // A Carqueixa
import p24 from '../../../src/assets/partners/24.png'; // Asociación Forestal de Galicia

const coordinator = {
  title: "Universidade de Santiago de Compostela",
  subtitle: "Spain",
  img: p1 // USC => 1.png
};

/* Actualizamos beneficiaries y associatedPartners agregando cada img */
const beneficiaries = [
  { title: "Región de Murcia", subtitle: "Spain", img: p2 },
  { title: "Leibniz-Zentrum Fuer Agrarlandschaftsforschung (ZALF)", subtitle: "Germany", img: p3 },
  { title: "Universidade de Coimbra", subtitle: "Portugal", img: p4 },
  { title: "Università di Pisa", subtitle: "Italy", img: p5 },
  { title: "Université de Tunis El Manar", subtitle: "Tunisia", img: p6 },
  { title: "Geoponiko Panepistimion Athinon", subtitle: "Greece", img: p7 },
  { title: "Univerzitet u Sarajevu", subtitle: "Bosnia and Herzegovina", img: p8 },
  { title: "Universidade da Coruña", subtitle: "Spain", img: p9 },
  { title: "Universidad Politécnica de Madrid", subtitle: "Spain", img: p10 },
  { title: "E-Science European Infrastructure for Biodiversity and Ecosystem Research (Lifewatch)", subtitle: "Spain", img: p11 },
  { title: "Narodne Lesnicke Centrum", subtitle: "Slovakia", img: p12 },
  { title: "Ver de Terre Production", subtitle: "France", img: p13 },
  { title: "Venetian Cluster", subtitle: "Italy", img: p14 },
  { title: "Luonnonvarakeskus", subtitle: "Finland", img: p15 },
  { title: "Programme for the Endorsement of Forest Certification Schemes Italia", subtitle: "Italy", img: p16 },
  { title: "Fundación Empresa Universidad Gallega (FEUGA)", subtitle: "Spain", img: p17 },
  { title: "Centro Internazionale di Altistudi Agronomici Mediterranei (CIHEAM)", subtitle: "Italy", img: p18 },
  { title: "University of Çukurova", subtitle: "Turkey", img: p19 },
  // { title: "senseen", subtitle: "", img: p20 },  // Descomenta si lo necesitas
  // { title: "wetsus", subtitle: "", img: p21 },   // Descomenta si lo necesitas
  { title: "Heliopolis University Association", subtitle: "Egypt", img: p22 },
];

const associatedPartners = [
  { title: "A Carqueixa", subtitle: "Spain", img: p23 },
  { title: "Asociación Forestal de Galicia (AFG)", subtitle: "Spain", img: p24 }
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
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Coordinator</h2>
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4">
          {/* Logo */}
          <img
            src={coordinator.img}
            alt={coordinator.title}
            className="w-16 h-auto object-contain"
          />
          {/* Info */}
          <div>
            <h3 className="text-xl font-bold">{coordinator.title}</h3>
            <p className="text-lg text-darkGreen">{coordinator.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Beneficiaries Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Beneficiaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficiaries.map((partner, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4">
              <img
                src={partner.img}
                alt={partner.title}
                className="w-16 h-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">{partner.title}</h3>
                <p className="text-lg text-darkGreen">{partner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Associated Partners Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">Associated Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {associatedPartners.map((partner, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg flex items-center space-x-4">
              <img
                src={partner.img}
                alt={partner.title}
                className="w-16 h-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">{partner.title}</h3>
                <p className="text-lg text-darkGreen">{partner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}