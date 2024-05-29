import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { selectedElement, setElements, setSelectedElement } = useContext(AppContext);

  const ChangingSvgStrokeColor = (color) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === selectedElement ? { ...el, stroke: color } : el
      )
    );
    setSelectedElement(null)
  };

  return (
    <header className='bg-blue-800 m-1 flex justify-between'>
      <button className='bg-pink-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('pink')}>
        <h1 className='text-center'>H=0.20</h1>
      </button>
      <button className='bg-purple-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('purple')}>
        <h1 className='text-center'>H=0.30</h1>
      </button>
      <button className='bg-orange-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('orange')}>
        <h1 className='text-center'>H=0.40</h1>
      </button>
      <button className='bg-yellow-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('yellow')}>
        <h1 className='text-center'>H=0.50</h1>
      </button>
      <button className='bg-black p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('black')}>
        <h1 className='text-center'>H=0.60</h1>
      </button>
      <button className='bg-red-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('red')}>
        <h1 className='text-center'>H=0.70</h1>
      </button>
      <button className='bg-green-800 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('green')}>
        <h1 className='text-center'>H=0.80</h1>
      </button>
      <button className='bg-blue-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('blue')}>
        <h1 className='text-center'>H=0.90</h1>
      </button>
      <button className='bg-green-600 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('green')}>
        <h1 className='text-center'>H=1.2</h1>
      </button>
      <button className='bg-gray-700 p-2 m-1 text-white'
        onClick={() => ChangingSvgStrokeColor('#374151')}>
        <h1 className='text-center'>H=1.5</h1>
      </button>
    </header>
  );
}