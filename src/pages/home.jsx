import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MarioCard from "../components/cards";
import axios from "axios";
import ModalAddCard from "../components/modalAddCard";
import ConfirmDeleteModal from "../components/confirmarModal";
import { useAuth } from "../context/authContext";

const Home = () => {
    const { socketStatus } = useAuth();
    const [characterCards, setCharacterCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const apiUrl = process.env.API_HOST;


    // Función para cargar todas las tarjetas desde la base de datos
    const fetchCards = async () => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.get(`${apiUrl}/marioTransformations/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCharacterCards(response.data);
        } catch (error) {
            console.error("Error al cargar las tarjetas:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleAddCard = async (newCard) => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.post(`${apiUrl}/marioTransformations/new`, newCard, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200 || response.status === 201) {
                fetchCards();
            }
        } catch (error) {
            console.error("Error al agregar la tarjeta:", error);
        }
    };

    const handleEditCard = async (editedCard) => {
        const token = localStorage.getItem("authToken");

        try {
            const response = await axios.put(
                `${apiUrl}/marioTransformations/update/${selectedCard._id}`,
                editedCard,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                fetchCards();
            }
        } catch (error) {
            console.error("Error al editar la tarjeta:", error);
        }
    };

    const confirmDeleteCard = (_id) => {
        setSelectedCard(_id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCard = async () => {
        const token = localStorage.getItem("authToken");
        try {
            await axios.delete(`${apiUrl}/marioTransformations/delete/${selectedCard}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCards();
            setIsDeleteModalOpen(false);
            setSelectedCard(null);
        } catch (error) {
            console.error("Error al eliminar la tarjeta:", error);
        }
    };

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    return (
        <section className="flex flex-col h-screen">
            {/* Texto del socket en la parte superior, centrado */}
            <div className="flex justify-center items-center h-20 bg-gray-200 text-black rounded shadow-md">
                <div className="flex items-center">
                    {/* Indicador de estado */}
                    <div
                        className={`w-4 h-4 rounded-full mr-2 ${socketStatus === "Online" ? "bg-green-500" : "bg-red-500"
                            }`}
                    ></div>
                    {/* Texto del estado */}
                    <p>
                       <span className="font-bold">{socketStatus}</span>
                    </p>
                </div>
            </div>

            {/* Tarjetas en la parte inferior */}
            <div className="flex-grow p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {characterCards.map((character) => (
                    <MarioCard
                        key={character._id}
                        id={character._id}
                        name={character.name}
                        powerUp={character.powerUp}
                        hability={character.hability}
                        imageUrl={character.imageUrl}
                        onEdit={() => openEditModal(character)}
                        onDelete={() => confirmDeleteCard(character._id)}
                    />
                ))}
            </div>

            {/* Botón flotante */}
            <button
                onClick={() => {
                    setSelectedCard(null);
                    setIsModalOpen(true);
                }}
                className="fixed bottom-10 right-10 bg-rose-600 text-white rounded-full p-4 shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {/* Modal para agregar o editar tarjetas */}
            <ModalAddCard
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={selectedCard ? handleEditCard : handleAddCard}
                initialData={selectedCard}
            />

            {/* Modal de confirmación de eliminación */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteCard}
            />
        </section>
    );
};

export default Home;
