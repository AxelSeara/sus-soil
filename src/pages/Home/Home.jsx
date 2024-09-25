import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Hero from './Hero/Hero';
import Map from './Mapa/Mapa';
import Details from './Detalles/Detalles';
import Contact from './Contacto/Contacto';
import News from './News/News'; 

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('URL_DE_TUS_ENTRADAS'); // Cambia esto por la URL correcta
      const data = await response.json();
      setPosts(data);
    };
    
    fetchPosts();
  }, []);

  return (
    <div>
      <Hero />
      <Map />
      <Details />
      <News posts={posts} /> {/* Añade la sección de noticias */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;