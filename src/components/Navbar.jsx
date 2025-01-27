import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="backdrop-blur-md fixed w-full z-30">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src="/src/assets/1lineLogo.svg" alt="SUS-SOIL Logo" className="h-8" />
                </Link>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-boreal p-2">
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-white md:bg-transparent absolute md:relative w-full md:w-auto top-full left-0 pt-4 md:pt-0`}>
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                        <li><Link to="/" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">Home</Link></li>
                        <li><Link to="/news" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">News</Link></li>
                        <li><Link to="/living-labs" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">Living Labs</Link></li>
                        <li><Link to="/resources" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">Resources</Link></li>
                        <li><Link to="/knowledge-cloud" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">Knowledge Cloud</Link></li>
                        <li><Link to="/contact" className="text-boreal p-2 rounded-xl hover:text-white hover:bg-green">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;