import React, { useState } from "react";

const ModalAddCard = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    powerUp: "",
    hability: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Envía los datos al componente padre
    setFormData({ name: "", powerUp: "", hability: "", imageUrl: "" }); // Resetea el formulario
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Agregar nueva tarjeta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Fire Mario"
              required
            />
          </div>
          <div>
            <label htmlFor="powerUp" className="block text-sm font-medium">
              Power-Up
            </label>
            <input
              type="text"
              name="powerUp"
              value={formData.powerUp}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Fire Flower"
              required
            />
          </div>
          <div>
            <label htmlFor="hability" className="block text-sm font-medium">
              Habilidad
            </label>
            <input
              type="text"
              name="hability"
              value={formData.hability}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ej: Lanza bolas de fuego"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium">
              URL de la imagen
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://example.com/image.png"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddCard;
