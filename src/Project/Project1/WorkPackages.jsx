// src/Project/Project1/WorkPackages.jsx
import React from 'react';

const workPackages = [
  {
    title: "WP1 - Networking: the Agroecological Subsoil Management Network",
    ledBy: "Centro Internazionale di Altistudi Agronomici Mediterranei (CIHEAM-IAMB)",
    objectives: [
      "To establish 15 Living Labs (LLs) in pedoclimatic relevant areas for Europe and to organize all LL activities.",
      "To establish the Agroecological Subsoil Management Network (ASMN) to foster synergies between the SUS-SOIL project and other infrastructures, networks, projects and Living Labs (LLs) of Europe.",
      "To support the rest of SUS-SOIL Work Packages, from WP2 to WP8."
    ]
  },
  {
    title: "WP2 - Subsoil Database collection and harmonization from synergistic infrastructures",
    ledBy: "E-Science European Infrastructure (LifeWatch ERIC)",
    objectives: [
      "To map current subsoil/soil fertility projects, initiatives, databases and infrastructures, in order to gather subsoil data in collaboration with the ASMN (T1.3) and assess the main subsoil and topsoil fertility interactions and their respective land use and management practices in rural and urban areas.",
      "To develop a protocol for subsoil sampling and data gathering.",
      "To develop the SUS-SOIL template database (S-DB) to harmonize the database population of external and SUS-SOIL data."
    ]
  },
  {
    title: "WP3 – Soil health, land use and management experiments",
    ledBy: "Agricultural University of Athens (AUA)",
    objectives: [
      "To identify the long-term land use LUCAS points in order to be sampled as a way to understand the long-term soil use and management on soil and subsoil organic matter, water and nutrient dynamics.",
      "To gather harmonized data from the selected agricultural, forest and urban soils.",
      "To analyse the topsoil/subsoil dynamics and plant production by evaluating organic matter additions into soils with mineral or organic subsoil."
    ]
  },
  {
    title: "WP4 - Subsoil /soil interactions, land use, management practices, climate change and biodiversity modelling",
    ledBy: "Università di Pisa (UNIPI)",
    objectives: [
      "To provide a framework for the new models development.",
      "To model the topsoil/subsoil traits at various depths and the interdependencies of each trait between the upper and lower layers considering land use and management (i.e. tillage) and water movements in the soil.",
      "To identify main LL farm ideotypes linked to LULUC and management practices for farms.",
      "To develop aboveground indicators to provide subsoil health indicators."
    ]
  },
  {
    title: "WP5 - Subsoil ecosystem services sustainability assessment",
    ledBy: "Universidade de Coimbra (UC)",
    objectives: [
      "To develop an integrated assessment framework for transparently evaluating ASM land use and management impact LL scenarios on subsoil sustainability and the respective ecosystem services.",
      "To quantify the cost of implementing the alternative farm and urban infrastructure ideotypes.",
      "To quantify the contributions of the ASM land use and management to climate goals and biodiversity while assessing their effects.",
      "To evaluate the willingness to implement the subsoil sustainable practices in each LL region and social benefits delivery."
    ]
  },
  {
    title: "WP6 - Bioeconomic and Macroenconomic MODAM-CGE Model",
    ledBy: "Leibniz Centre for Agricultural Landscape Research (ZALF)",
    objectives: [
      "To develop robust business plans and innovative business models of the baseline and alternative mix of relevant farm idiotypes.",
      "To develop and optimize a DST based on MODAM modelling for macroeconomic impact assessment.",
      "To develop policy alternatives for addressing subsoil health challenges across diverse contexts (i.e.soil degradation) including agriculture, forestry, urban areas, conservation, and sensitive landscapes by combining the results for the different farm and urban ideotypes."
    ]
  },
  {
    title: "WP7 - Sub-soil database platform development",
    ledBy: "Agricultural University of Athens (AUA)",
    objectives: [
      "To develop digital tools to present the aggregated knowledge in an easy to access format, including:",
      "A Subsoil Database.",
      "A Subsoil Knowledge Cloud (S-KC).",
      "A Subsoil Decision Support Tool (DST).",
      "An Alive Handbook."
    ]
  },
  {
    title: "WP8 - Communication, Dissemination and Exploitation",
    ledBy: "Fundación Empresa Universidad Gallega (FEUGA)",
    objectives: [
      "To communicate project results and its relevance making them all well known to relevant stakeholders, maximising the expected impacts and contributing to Mission Soil objectives.",
      "To facilitate active dissemination and demonstration of sustainable management practices, involving relevant stakeholders.",
      "To design and develop a methodological framework to define effective exploitation of results, protect the innovations generated and propose activities to ensure sustainability of SUS-SOIL ASMN."
    ]
  },
  {
    title: "WP9 – Project Management",
    ledBy: "Universidade de Santiago de Compostela (USC)",
    objectives: [
      "To implement project infrastructure for efficient reporting and internal communication.",
      "To administer and transfer payments from the European Commission.",
      "To consolidate and submit periodic progress reports and the final report including financial reports.",
      "To organize the kick-off meeting and the international conference.",
      "To address all financial, ethical, legal, intellectual property and administrative matters related to the consortium/ project, as well as manage gender equality issues, in terms of EU procedures and rules.",
      "To create a project database."
    ]
  },
  {
    title: "WP10 - Ethics requirements",
    ledBy: "Universidade de Santiago de Compostela (USC)",
    objectives: [
      "To ensure compliance with the 'ethics requirements' set out in this work package."
    ]
  }
];

export default function WorkPackages() {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-4 text-brown">
      {/* Título de la sección */}
      <h1 className="text-5xl font-bold text-center mb-10">
        Work Packages
      </h1>

      {/* Subtítulo breve */}
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
        To facilitate achieving its different goals, the project activities are structured 
        across ten Work Packages.
      </p>

      {/* Contenedor de WP cards */}
      <div className="space-y-10">
        {workPackages.map((wp, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg transition-transform duration-300
                       hover:shadow-lg hover:-translate-y-1"
          >
            {/* Título WP */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              {wp.title}
            </h2>
            {/* Led by */}
            <p className="text-md md:text-lg font-medium text-darkGreen mb-4">
              Led by: {wp.ledBy}
            </p>
            {/* Lista de objetivos */}
            <ul className="list-disc pl-5 space-y-2 text-md md:text-lg leading-relaxed">
              {wp.objectives.map((objective, objIndex) => (
                <li key={objIndex}>{objective}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}