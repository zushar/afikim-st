import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { handleRotateElement, deleteElement, setColor, setHeight } = useContext(AppContext);

  const ChangingSvgStrokeColor = (color, textContent) => {
    setColor(color);
    setHeight(textContent);
  };

  return (
    <header className='bg-blue-800 flex flex-col'>
      <h1 className=' text-pink-500 text-2xl flex justify-center '>בחירת גובה לבמות</h1>
      <div className='flex justify-between'> 
        {[
          { color: 'darkgreen', text: 'ג=0.20' },
          { color: 'orange', text: 'ג=0.30' },
          { color: 'purple', text: 'ג=0.40' },
          { color: '#f0f00c', text: 'ג=0.50' },
          { color: 'black', text: 'ג=0.60' },
          { color: 'red', text: 'ג=0.70' },
          { color: 'gold', text: 'ג=0.80' },
          { color: 'pink', text: 'ג=0.90' },
          { color: 'blue', text: 'ג=1.0' },
          { color: 'limegreen', text: 'ג=1.2' },
          { color: '#ffcba4', text: 'ג=1.5' }
        ].map(({ color, text }) => (
          <button key={color}
            className={` m-5 text-white`}
            onClick={() => ChangingSvgStrokeColor(color, text)}
            style={{ backgroundColor: color, width: '100px' }}
          >
            <h1 className='text-center'>{text}</h1>
          </button>
        ))}
        <button aria-label='כפתור בשביל למחוק במה מסומנת' className='bg-red-600 p-2 m-1 text-white' onClick={()=>{
          deleteElement();
        console.log('delete');
        }}>
          <h1 className='text-center ml-2 mr-2'>🗑️</h1>
        </button>
        <button aria-label='כפתור בשביל להפוך במה' className='bg-gray-900 p-2 m-1 mr-2 text-white' onClick={handleRotateElement}>
          <h1 className='text-center ml-2 mr-2'>↻</h1>
        </button>
      </div>
    </header>
  );
}