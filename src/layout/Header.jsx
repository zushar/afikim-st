import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { selectedElement, handleRotateElement, setSelectedElement, setLegs, deletElement, setColor, setHeight } = useContext(AppContext);

  const ChangingSvgStrokeColor = (color, textContent) => {
    setColor(color);
    setHeight(textContent);
  };

  return (
    <header className='bg-blue-800 m-1 flex justify-between'>
      {[
        { color: 'pink', text: 'H=0.20' },
        { color: 'purple', text: 'H=0.30' },
        { color: 'orange', text: 'H=0.40' },
        { color: 'yellow', text: 'H=0.50' },
        { color: 'black', text: 'H=0.60' },
        { color: 'red', text: 'H=0.70' },
        { color: 'gree', text: 'H=0.80' },
        { color: 'blue', text: 'H=0.90' },
        { color: 'green', text: 'H=1.2' },
        { color: '#374151', text: 'H=1.5' }
      ].map(({ color, text }) => (
        <button key={color} className={`bg-${color}-600 p-2 m-1 text-white`} onClick={() => ChangingSvgStrokeColor(color, text)}>
          <h1 className='text-center'>{text}</h1>
        </button>
      ))}
      <button className='bg-red-600 p-2 m-1 text-white' onClick={deletElement}>
        <h1 className='text-center ml-2 mr-2'>🗑️</h1>
      </button>
      <button className='bg-gray-900 p-2 m-1 mr-2 text-white' onClick={handleRotateElement}>
        <h1 className='text-center ml-2 mr-2'>↻</h1>
      </button>
    </header>
  );
}