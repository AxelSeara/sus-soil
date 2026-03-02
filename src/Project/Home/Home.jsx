import React from 'react';
import Hero from './Hero/Hero';
import Map from './Mapa/Mapa';
import Details from './Detalles/Detalles';
import News from './News/News';
import Colaboradores from './Colaboradores/Colaboradores';

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-[#f3fbf5] via-white to-[#f6fcf7]">
      <Hero />
      <Details />
      <Map />
      <News />
      <Colaboradores />
    </main>
  );
};

export default Home;
