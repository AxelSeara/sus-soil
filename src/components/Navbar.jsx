import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown 
} from 'react-icons/fi';
import { 
  FaHome, 
  FaUserGraduate, 
  FaTasks, 
  FaUsers, 
  FaNewspaper, 
  FaFlask, 
  FaBookOpen, 
  FaPenFancy, 
  FaEnvelopeOpenText, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaYoutube 
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Twitter/X icon
import logo from '../assets/SUS-SOIL_LOGO__Logo 1.svg';

// Opciones del submenú de 'Project' con íconos
const projectItems = [
  { to: '/project/about', label: 'About', Icon: FaUserGraduate },
  { to: '/project/work-packages', label: 'Work Packages', Icon: FaTasks },
  { to: '/project/partners', label: 'Partners', Icon: FaUsers },
];

// Opciones del submenú de 'Resources' con íconos
const resourcesItems = [
  // { to: '/resources', label: 'Overview', Icon: FaBookOpen },
  { to: '/resources/materials', label: 'Materials', Icon: FaFlask },
  { to: '/resources/practice-abstracts', label: 'Practice Abstracts', Icon: FaPenFancy },
  { to: '/resources/newsletter', label: 'Newsletter', Icon: FaEnvelopeOpenText },
];

export default function Navbar() {
  // Estado para el menú móvil
  const [mobileOpen, setMobileOpen] = useState(false);
  // Estado para los dropdowns (solo uno abierto a la vez)
  const [openDropdown, setOpenDropdown] = useState(null);

  // Referencia para detectar clics fuera
  const menuRef = useRef(null);

  // Manejo de clics fuera del menú para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Evita el scroll en dispositivos móviles cuando el menú está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileOpen]);

  // Función para abrir/cerrar dropdowns
  const toggleDropdown = (menuName) => {
    setOpenDropdown(prev => (prev === menuName ? null : menuName));
  };

  // Cierra todo al hacer clic en un enlace
  const closeAll = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // Clases de estilo
  const navLinkClass = "text-brown text-sm lg:text-base font-medium hover:text-darkGreen transition-colors";
  const dropdownContainerClass = "absolute left-0 top-full mt-2 bg-lightGreen text-brown rounded shadow-lg z-[1000] min-w-[280px] p-2";
  const dropdownItemClass = "flex items-center px-4 py-2 gap-2 hover:bg-green hover:text-white transition-colors";

  return (
    <nav className="fixed z-[1000] border-b border-solid border-prime-gray-200 w-full py-3 bg-white px-4">
      <div className="container mx-auto" ref={menuRef}>
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-14">
          
          {/* Branding + Botón móvil */}
          <div className="flex justify-between w-full">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
            <button
              type="button"
              className="inline-flex items-center p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-controls="navbar-mobile"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Menú Desktop y Móvil */}
          <div className={`${mobileOpen ? "block" : "hidden"} w-full lg:flex lg:pl-11`} id="navbar-desktop">
            <ul className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 mt-4 lg:mt-0 w-full lg:w-auto">
              
              {/* HOME */}
              <li>
                <Link to="/" className={`${navLinkClass} lg:mr-6 flex items-center gap-1`} onClick={closeAll}>
                  Home
                </Link>
              </li>

              {/* PROJECT (Dropdown) */}
              <li className="relative">
                <button onClick={() => toggleDropdown("project")} className={`${navLinkClass} flex items-center lg:mr-6`} aria-expanded={openDropdown === "project"}>
                  Project <FiChevronDown className="w-3 h-3 ml-1.5" />
                </button>
                {openDropdown === "project" && (
                  <div className={dropdownContainerClass}>
                    <ul>
                      {projectItems.map((item, index) => (
                        <li key={index}>
                          <Link to={item.to} className={dropdownItemClass} onClick={closeAll}>
                            <item.Icon />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* NEWS */}
              <li>
                <Link to="/news" className={`${navLinkClass} lg:mr-6`} onClick={closeAll}>
                  News
                </Link>
              </li>

              {/* LIVING LABS */}
              <li>
                <Link to="/living-labs" className={`${navLinkClass} text-nowrap
 lg:mr-6`} onClick={closeAll}>
                  Living Labs
                </Link>
              </li>

              {/* RESOURCES (Dropdown) */}
              <li className="relative">
                <button onClick={() => toggleDropdown("resources")} className={`${navLinkClass} flex items-center lg:mr-6`} aria-expanded={openDropdown === "resources"}>
                  Resources <FiChevronDown className="w-3 h-3 ml-1.5" />
                </button>
                {openDropdown === "resources" && (
                  <div className={dropdownContainerClass}>
                    <ul>
                      {resourcesItems.map((item, index) => (
                        <li key={index}>
                          <Link to={item.to} className={dropdownItemClass} onClick={closeAll}>
                            <item.Icon />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>

              {/* CONTACT */}
              <li><Link to="/contact" className={`${navLinkClass} lg:mr-6`} onClick={closeAll}>Contact</Link></li>

              {/* Social Media */}
              <li className="flex items-center space-x-4 lg:ml-4">
                <a href="#" className="text-brown hover:text-darkGreen"><FaFacebookF /></a>
                <a href="#" className="text-brown hover:text-darkGreen"><FaXTwitter /></a>
                <a href="#" className="text-brown hover:text-darkGreen"><FaLinkedinIn /></a>
                <a href="#" className="text-brown hover:text-darkGreen"><FaYoutube /></a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}