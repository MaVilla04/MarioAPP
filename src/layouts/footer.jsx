import React from "react";

const Footer = () => {
    return (
        <footer className="bg-rose-600 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    {/* Sección de enlaces */}
                    <div className="mb-6 sm:mb-0">
                    <img className="h-12 w-12" src="/logo.svg" alt="Mario" />
                        <p className="text-sm py-2">La mejor app para fanáticos de Mario Bros.</p>
                    </div>

                    {/* Enlaces */}
                    <div className="flex space-x-6">
                        <a href="#" className="text-sm hover:text-yellow-400">Inicio</a>
                        <a href="#" className="text-sm hover:text-yellow-400">Personajes</a>
                        <a href="#" className="text-sm hover:text-yellow-400">Contacto</a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} MarioApp. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
