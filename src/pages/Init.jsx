import React from 'react';

const InitPage = () => {
  return (
    <section className="max-h-screen mt-[4.8rem] bg-white text-gray-800 py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Título Principal */}
        <h1 className="text-4xl font-extrabold text-rose-500 mb-6">
          ¡Descubre el Poder del Tanooki! 🦝✨
        </h1>

        {/* Descripción */}
        <p className="text-lg sm:text-xl text-gray-700 mb-12">
          ¿Sabías que en <span className="font-semibold">Super Mario Bros. 3</span>, Mario pudo transformarse en un <strong className="text-rose-500">mapache Tanooki</strong>?
          Además de volar, ¡podía convertirse en una estatua invulnerable a los enemigos! 😱
          Esta habilidad revolucionó los juegos de Mario y sigue siendo uno de sus poderes más icónicos.
        </p>

        <div className="mb-6 mt-12">
          <img 
            src="https://cdn.discordapp.com/attachments/1093593004327059457/1312267383158734970/250px-Tanooki_Mario_Artwork_-_Super_Mario_3D_World.png?ex=674bdfbc&is=674a8e3c&hm=1fa2e1739b18abb2565d301cf650902046f12262b4b2ef0596d1be5ed5af8862&" 
            alt="Tanooki Mario"
            className="mx-auto rounded-lg animate-bounce transition-all duration-700"
          />
        </div>

        <div>
          <a 
            href="#explore" 
            className="inline-block bg-rose-500 text-white text-lg font-semibold py-3 px-8 rounded-lg hover:bg-rose-600 transition duration-600"
          >
            ¡Descubre más sobre Mario!
          </a>
        </div>
      </div>
    </section>
  );
};

export default InitPage;
