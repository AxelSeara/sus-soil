import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiX, FiMenu, FiChevronRight } from 'react-icons/fi';

const Navbar = () => {
    const [isSubmenuOpen, setSubmenuOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    // Toggle submenu visibility
    const handleSubmenu = (state) => {
        setSubmenuOpen(state);
    };

    return (
        <nav className="backdrop-blur-md fixed w-full z-30">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center ">
                <Link to="/" className="text-xl font-bold text-gray-800">
                    SUS-SOIL
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800 p-2">
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-white md:bg-transparent absolute md:relative w-full md:w-auto top-full left-0 pt-4 md:pt-0`}>
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <li className="relative">
                            <button
                                className="flex items-center text-gray-800 px-2 rounded-xl hover:text-white hover:bg-green-400"
                                onMouseOver={() => handleSubmenu(true)}
                                onMouseOut={() => handleSubmenu(false)}
                            >
                                Home <FiChevronRight className="ml-1 transform transition-transform duration-200" style={{ transform: `rotate(${isSubmenuOpen ? 90 : 0}deg)` }}/>
                            </button>
                            {isSubmenuOpen && (
                                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2"
                                    onMouseOver={() => handleSubmenu(true)}
                                    onMouseOut={() => handleSubmenu(false)}>
                                    <li><Link to="/about" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">About</Link></li>
                                    <li><Link to="/work-packages" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Work Packages</Link></li>
                                    <li><Link to="/partners" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Partners</Link></li>
                                </ul>
                            )}
                        </li>
                        <li><Link to="/news" className="text-gray-800 p-2 rounded-xl hover:text-white hover:bg-green-400">News</Link></li>
                        <li><Link to="/living-labs" className="text-gray-800 p-2 rounded-xl hover:text-white hover:bg-green-400">Living Labs</Link></li>
                        <li><Link to="/resources" className="text-gray-800 p-2 rounded-xl hover:text-white hover:bg-green-400">Resources</Link></li>
                        <li><Link to="/knowledge-cloud" className="text-gray-800 p-2 rounded-xl hover:text-white hover:bg-green-400">Knowledge Cloud</Link></li>
                        <li><Link to="/contact" className="text-gray-800 p-2 rounded-xl hover:text-white hover:bg-green-400">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;