// src/Project/Project1/About.jsx
import React from 'react';

export default function About() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16 text-brown">
      {/* Título principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        About SUS-SOIL
      </h1>

      {/* Introducción en un bloque */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <p className="text-lg leading-relaxed">
          SUS-SOIL is a 4-year Horizon Europe funded project that adopts a 
          multidisciplinary approach, focused on the development of 15 Subsoil-Living 
          Labs (LLs) to inventory, analyse and benchmark different agroecology subsoil 
          management (ASM) and land uses, studying their impacts on the subsoil spatial 
          variations and dynamics to best combine ASM practices in rural and urban areas 
          within a global regional context.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          SUS-SOIL results will be the start point to increase the awareness of land 
          managers and public authorities to understand the subsoil threats and risks, 
          support EU agroecological transformation tackling subsoils and increasing 
          ecosystem services delivery, promote water security and climate change 
          mitigation of rural and urban ecosystems.
        </p>
      </div>

      {/* Línea divisoria sutil */}
      <hr className="border-brown/20 mb-8" />

      {/* Sección de Main Outcomes */}
      <h2 className="text-3xl font-semibold text-center mb-8">
        Main Outcomes
      </h2>

      {/* Grid de outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tarjeta 1 */}
        <div className="bg-lightGreen p-6 rounded-lg shadow-md">
          <p className="text-brown text-md leading-relaxed">
            To develop a subsoil/soil monitoring database (S-DB) 
            able to be interoperable with the LUCAS and ESDAC databases.
          </p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-lightGreen p-6 rounded-lg shadow-md">
          <p className="text-brown text-md leading-relaxed">
            To analyse the long-term ASM land use and management 
            of 3 relevant types of soil per LL and the relationship 
            with rural and urban ecosystem services delivery, 
            including modelling.
          </p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-lightGreen p-6 rounded-lg shadow-md">
          <p className="text-brown text-md leading-relaxed">
            To develop a set of farm idiotypes per LL mixing the ASM best practices 
            as an alternative to conventional systems to enhance the ecosystem services 
            provision at regional level for citizens.
          </p>
        </div>

        {/* Tarjeta 4 */}
        <div className="bg-lightGreen p-6 rounded-lg shadow-md">
          <p className="text-brown text-md leading-relaxed">
            To create a Subsoil Decision Support Tool (S-DST) considering 
            soil degradation and relevant business models.
          </p>
        </div>

        {/* Tarjeta 5 */}
        <div className="bg-lightGreen p-6 rounded-lg shadow-md">
          <p className="text-brown text-md leading-relaxed">
            To propose a subsoil policy strategy framework 
            to foster ASM best practices.
          </p>
        </div>
      </div>
    </section>
  );
}