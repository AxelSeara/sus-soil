import React from 'react';

const WorkPackages = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-16 px-4  text-brown">
            <h1 className="text-5xl mt-16 font-bold text-center mb-10">Work Packages</h1>
            
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
                To facilitate achieving its different goals, the project activities are structured across ten Work Packages.
            </p>

            <div className="space-y-12">
                {workPackages.map((wp, index) => (
                    <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-3xl font-semibold mb-3">{wp.title}</h2>
                        <p className="text-lg font-medium text-darkGreen mb-4">Led by: {wp.ledBy}</p>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                            {wp.objectives.map((objective, objIndex) => (
                                <li key={objIndex}>{objective}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
            "To map current subsoil/soil fertility projects, initiatives, databases and infrastructures...",
            "To develop a protocol for subsoil sampling and data gathering.",
            "To develop the SUS-SOIL template database (S-DB) to harmonize the database population of external and SUS-SOIL data."
        ]
    },
    {
        title: "WP3 – Soil health, land use and management experiments",
        ledBy: "Agricultural University of Athens (AUA)",
        objectives: [
            "To identify the long-term land use LUCAS points in order to be sampled...",
            "To gather harmonized data from the selected agricultural, forest and urban soils.",
            "To analyse the topsoil/subsoil dynamics and plant production by evaluating organic matter additions into soils with mineral or organic subsoil."
        ]
    },
    {
        title: "WP4 - Subsoil /soil interactions, land use, management practices, climate change and biodiversity modelling",
        ledBy: "Università di Pisa (UNIPI)",
        objectives: [
            "To provide a framework for the new models development...",
            "To model the topsoil/subsoil traits at various depths and the interdependencies of each trait between the upper and lower layers..."
        ]
    },
    {
        title: "WP5 - Subsoil ecosystem services sustainability assessment",
        ledBy: "Universidade de Coimbra (UC)",
        objectives: [
            "To develop an integrated assessment framework...",
            "To quantify the contributions of the ASM land use and management to climate goals...",
            "To evaluate the willingness to implement the subsoil sustainable practices in each LL region."
        ]
    },
    {
        title: "WP6 - Bioeconomic and Macroenconomic MODAM-CGE Model",
        ledBy: "Leibniz Centre for Agricultural Landscape Research (ZALF)",
        objectives: [
            "To develop robust business plans and innovative business models...",
            "To develop policy alternatives for addressing subsoil health challenges...",
            "To optimize a DST based on MODAM modelling for macroeconomic impact assessment."
        ]
    },
    {
        title: "WP7 - Sub-soil database platform development",
        ledBy: "Agricultural University of Athens (AUA)",
        objectives: [
            "To develop digital tools to present the aggregated knowledge...",
            "A Subsoil Database, a Subsoil Knowledge Cloud, a Subsoil Decision Support Tool, and an Alive Handbook."
        ]
    },
    {
        title: "WP8 - Communication, Dissemination and Exploitation",
        ledBy: "Fundación Empresa Universidad Gallega (FEUGA)",
        objectives: [
            "To communicate project results and its relevance...",
            "To facilitate active dissemination and demonstration of sustainable management practices...",
            "To define effective exploitation of results and protect the innovations generated."
        ]
    },
    {
        title: "WP9 – Project Management",
        ledBy: "Universidade de Santiago de Compostela (USC)",
        objectives: [
            "To implement project infrastructure for efficient reporting and internal communication.",
            "To consolidate and submit periodic progress reports and the final report including financial reports.",
            "To organize the kick-off meeting and the international conference."
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

export default WorkPackages;