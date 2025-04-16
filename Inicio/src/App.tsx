import React from 'react';
import { Gamepad2 } from 'lucide-react';

const links = [
  {
    title: 'Matemáticas Divertidas',
    url: 'https://www.mathgames.com',
    color: 'bg-yellow-200',
    hoverColor: 'hover:bg-yellow-300',
  },
  {
    title: 'Aprende Idiomas',
    url: 'https://www.duolingo.com',
    color: 'bg-green-200',
    hoverColor: 'hover:bg-green-300',
  },
  {
    title: 'Ciencia Interactiva',
    url: 'https://www.sciencekids.co.nz',
    color: 'bg-blue-200',
    hoverColor: 'hover:bg-blue-300',
  },
  {
    title: 'Geografía Mundial',
    url: 'https://www.seterra.com',
    color: 'bg-pink-200',
    hoverColor: 'hover:bg-pink-300',
  },
  {
    title: 'Programación para Niños',
    url: 'https://scratch.mit.edu',
    color: 'bg-purple-200',
    hoverColor: 'hover:bg-purple-300',
  },
  {
    title: 'Historia Animada',
    url: 'https://www.brainpop.com',
    color: 'bg-orange-200',
    hoverColor: 'hover:bg-orange-300',
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <Gamepad2 className="w-10 h-10" />
          Aprende Jugando
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Explora recursos educativos divertidos e interactivos
        </p>
      </div>

      {/* Sticky Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${link.color} ${link.hoverColor}
              p-6 rounded-lg shadow-lg
              transform hover:-translate-y-1 transition-all duration-200
              flex flex-col
              min-h-[200px]
              relative
              cursor-pointer
              group
            `}
          >
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-gray-300 rounded-full" />
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              {link.title}
            </h2>
            <p className="text-gray-600 flex-grow">
              Haz clic para explorar recursos interactivos y divertidos
            </p>
            <div className="text-sm text-gray-500 mt-4 group-hover:underline">
              Abrir recurso →
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-600">
        <p>Selecciona cualquier tarjeta para comenzar tu aventura de aprendizaje</p>
      </footer>
    </div>
  );
}

export default App;