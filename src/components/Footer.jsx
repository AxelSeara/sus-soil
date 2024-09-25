import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Universidad XYZ</h2>
          <p className="text-sm">Dirección: Calle Ejemplo, Ciudad</p>
          <p className="text-sm">Teléfono: (123) 456-7890</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
          <ul className="list-none">
            <li><a href="/about" className="hover:underline">Acerca de</a></li>
            <li><a href="/news" className="hover:underline">Noticias</a></li>
            <li><a href="/contact" className="hover:underline">Contacto</a></li>
            <li><a href="/resources" className="hover:underline">Recursos</a></li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Redes Sociales</h3>
          <ul className="flex space-x-4">
            <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
            <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
            <li><a href="https://linkedin.com" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4 border-t border-gray-700 pt-4">
        <p className="text-sm">© {new Date().getFullYear()} Universidad XYZ. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;