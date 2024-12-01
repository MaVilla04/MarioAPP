import React, { useState } from 'react';
import ModalAuth from '../components/modalAuth';
import { Link } from 'react-router-dom'; // Usa Link en lugar de <a> para las rutas internas
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtén el estado de autenticación y la función de logout
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <nav className="bg-rose-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-12 w-12" src="/logo.svg" alt="Mario" />
            </Link>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cards" className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">
                  Mis Cards
                </Link>
                <button onClick={logout} className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <button onClick={openModal} className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </button>
                <button onClick={openModal} className="hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium">
                  SignUp
                </button>
              </>
            )}
          </div>

          {/* Botón Hamburguesa */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-red-600 inline-flex items-center justify-center p-2 rounded-md hover:bg-red-700 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <ModalAuth isOpen={modalOpen} onClose={closeModal} />

      {/* Links Móviles */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              <Link to="/cards" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                Mis Cards
              </Link>
              <button onClick={logout} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button onClick={openModal} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                Login
              </button>
              <button onClick={openModal} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-red-600">
                SignUp
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
