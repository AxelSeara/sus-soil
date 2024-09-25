import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Hero from './Hero/Hero';
import Map from './Mapa/Mapa';
import Details from './Detalles/Detalles';
import Contact from './Contacto/Contacto';

const Home = () => {
  return (
    <div>
      <Hero />
      <Map />
      <Details />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;