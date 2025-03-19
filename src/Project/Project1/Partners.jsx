import React from 'react';

const Partners = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-16 px-4 text-brown">
            <h1 className="text-5xl mt-16 font-bold text-center mb-10">Project Partners</h1>
            <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
                SUS-SOIL is coordinated by the University of Santiago de Compostela (USC) from Spain, 
                and concentrates 22 partners from 13 countries across Europe and North Africa.
            </p>

            {/* Coordinator Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Coordinator</h2>
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h3 className="text-xl font-bold">Universidade de Santiago de Compostela</h3>
                    <p className="text-lg text-darkGreen">Spain</p>
                </div>
            </div>

            {/* Beneficiaries Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-semibold mb-6">Beneficiaries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beneficiaries.map((partner, index) => (
                        <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-xl font-bold">{partner.title}</h3>
                            <p className="text-lg text-darkGreen">{partner.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Associated Partners Section */}
            <div>
                <h2 className="text-3xl font-semibold mb-6">Associated Partners</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {associatedPartners.map((partner, index) => (
                        <div key={index} className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-xl font-bold">{partner.title}</h3>
                            <p className="text-lg text-darkGreen">{partner.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const beneficiaries = [
    { title: "Región de Murcia", subtitle: "Spain" },
    { title: "Leibniz-Zentrum Fuer Agrarlandschaftsforschung", subtitle: "Germany" },
    { title: "Universidade de Coimbra", subtitle: "Portugal" },
    { title: "Università di Pisa", subtitle: "Italy" },
    { title: "Université de Tunis El Manar", subtitle: "Tunisia" },
    { title: "Geoponiko Panepistimion Athinon", subtitle: "Greece" },
    { title: "Univerzitet u Sarajevu", subtitle: "Bosnia and Herzegovina" },
    { title: "Universidade da Coruña", subtitle: "Spain" },
    { title: "Universidad Politécnica de Madrid", subtitle: "Spain" },
    { title: "E-Science European Infrastructure for Biodiversity and Ecosystem Research", subtitle: "Spain" },
    { title: "Narodne Lesnicke Centrum", subtitle: "Slovakia" },
    { title: "Ver de Terre Production", subtitle: "France" },
    { title: "Venetian Cluster", subtitle: "Italy" },
    { title: "Luonnonvarakeskus", subtitle: "Finland" },
    { title: "Programme for the Endorsement of Forest Certification Schemes Italia", subtitle: "Italy" },
    { title: "Fundación Empresa Universidad Gallega", subtitle: "Spain" },
    { title: "Centro Internazionale di Altistudi Agronomici Mediterranei", subtitle: "Italy" },
    { title: "University of Çukurova", subtitle: "Turkey" },
    { title: "Heliopolis University Association", subtitle: "Egypt" }
];

const associatedPartners = [
    { title: "A Carqueixa", subtitle: "Spain" },
    { title: "Asociación Forestal de Galicia", subtitle: "Spain" }
];

export default Partners;