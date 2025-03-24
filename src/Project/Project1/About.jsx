import React from 'react';

const About = () => {
    return (
        <div className="max-w-screen-xl mx-auto py-16 px-4 text-brown">
            {/* Título principal */}
            <h1 className="text-5xl mt-16 font-bold text-center text-brown mb-10">
                About SUS-SOIL
            </h1>
            
            {/* Introducción */}
            <div className="bg-white shadow-md rounded-lg p-8 mb-12">
                <p className="text-lg leading-relaxed">
                    SUS-SOIL is a 4-year Horizon Europe funded project that adopts a <span className="bg-lightGreen font-semibold">multidisciplinary</span>
                    {' '}approach, focused on the development of <span className="bg-lightGreen font-semibold">15 Subsoil-Living Labs (LLs)</span> to inventory, analyse
                    and benchmark different agroecology subsoil management (ASM) and land uses, studying
                    their impacts on the <span className="bg-lightGreen font-semibold">subsoil spatial variations</span> and dynamics to best combine ASM practices
                    in rural and urban areas within a global regional context.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                    SUS-SOIL results will be the start point to <span className="bg-lightGreen font-semibold">increase the awareness</span> of land managers and
                    public authorities to understand the <span className="bg-lightGreen font-semibold">subsoil threats</span> and risks, support EU agroecological
                    transformation tackling subsoils and <span className="bg-lightGreen font-semibold">increasing ecosystem services</span> delivery, promote
                    water security and <span className="bg-lightGreen font-semibold">climate change mitigation</span> of rural and urban ecosystems.
                </p>
            </div>

            {/* Sección de resultados principales */}
            <h2 className="text-3xl font-semibold text-center text-brown mb-6">
                Main Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Tarjetas con cada outcome */}
                <div
                    className="bg-lightGreen shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <p className="text-brown text-md">
                        To develop a subsoil/soil monitoring database (S-DB) able to be interoperable with
                        the LUCAS and ESDAC databases.
                    </p>
                </div>
                <div
                    className="bg-lightGreen shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <p className="text-brown text-md">
                        To analyse the long-term ASM land use and management of 3 relevant types of soil
                        per LL and the relationship with rural and urban ecosystem services delivery,
                        including modelling.
                    </p>
                </div>
                <div
                    className="bg-lightGreen shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <p className="text-brown text-md">
                        To develop a set of farm idiotypes per LL mixing the ASM best practices as an
                        alternative to conventional systems to enhance the ecosystem services provision at
                        regional level for citizens.
                    </p>
                </div>
                <div
                    className="bg-lightGreen shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <p className="text-brown text-md">
                        To create a Subsoil Decision Support Tool (S-DST) considering soil degradation and
                        relevant business models.
                    </p>
                </div>
                <div
                    className="bg-lightGreen shadow-lg rounded-lg p-6 transition-transform hover:scale-105 hover:shadow-xl"
                >
                    <p className="text-brown text-md">
                        To propose a subsoil policy strategy framework to foster ASM best practices.
                    </p>
                </div>
            </div>
        </div>
    );
};


export default About;