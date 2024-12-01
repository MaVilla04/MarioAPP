import React from "react";

const MarioCard = ({ id, name, powerUp, hability, imageUrl, onEdit, onDelete }) => {
    return (
        <div className="w-64 hover:w-80 hover:scale-105 mx-auto bg-red-300 hover:bg-rose-500  text-white rounded-lg shadow-lg overflow-hidden hover:text-zinc-100 relative group transition-all duration-150">
            {/* Botones de editar y eliminar */}
            <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                {/* Botón de Editar */}
                <button
                    onClick={() => onEdit(id)}
                    className="bg-zinc-100 text-red-700 p-2 rounded-lg hover:bg-zinc-200 text-sm font-semibold flex items-center justify-center"
                >
                    <i className="fas fa-pencil-alt text-sm"></i>
                </button>
                {/* Botón de Eliminar */}
                <button
                    onClick={() => onDelete(id)}
                    className="bg-red-700 text-white p-2 rounded-lg hover:bg-red-800 text-sm font-semibold flex items-center justify-center"
                >
                    <i className="fas fa-trash text-sm"></i>
                </button>
            </div>

            {/* Imagen y contenido de la tarjeta */}
            <div className="flex justify-center px-8 pt-4">
                <img
                    className="w-40 h-40 object-contain"
                    src={imageUrl}
                    alt={name}
                />
            </div>

            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-center">{name}</h2>
                <p className="text-sm font-bold text-center">Power-Up: <span className="text-sm font-mono font-light">{powerUp}</span></p>
                <p className="text-sm font-bold text-center">Hability: <span className="text-sm font-mono font-light">{hability}</span></p>

                {/* Botón Ver más */}
                <div className="flex justify-center">
                    {/* <button className="mt-4 bg-zinc-100 text-red-700  px-3 py-1 rounded-md font-bold text-sm hover:border-2 hover:border-red-900 hover:scale-90 transition-all duration-150">
                        Ver más
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default MarioCard;
