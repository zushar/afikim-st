import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { handleRotateElement, deleteElement, setColor, setHeight } = useContext(AppContext);

  const ChangingSvgStrokeColor = (color, textContent) => {
    setColor(color);
    setHeight(textContent);
  };

  return (
    <header className='bg-blue-800 flex'>
      
      <div className='flex flex-col w-full'>
      <h1 className=' text-pink-500 text-2xl flex justify-center '>בחירת גובה לבמות</h1>
      <div className='flex justify-center'> 
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
            className={` ml-2 mr-2 text-white rounded-md`}
            onClick={() => ChangingSvgStrokeColor(color, text)}
            style={{ backgroundColor: color, width: '70px', height: '40px'}}
          >
            <h1 className='text-center'>{text}</h1>
          </button>
        ))}
      </div>
      </div>
      <div className='flex w-full justify-center'>
        <button aria-label='כפתור בשביל למחוק במה מסומנת' className='bg-red-600 ml-8 mr-8 text-white w-32 rounded-md m-2' onClick={()=>{
          deleteElement();
        }}>
          <h1 className='text-center'>מחיקת במה</h1>
          <h1 className='text-center ml-2 mr-2'>🗑️</h1>
        </button>
        <button aria-label='כפתור בשביל להפוך במה' className='bg-gray-900 ml-8 mr-8 text-white w-32 rounded-md m-2' onClick={handleRotateElement}>
          <h1 className='text-center'>הפוך במה</h1>
          <h1 className='text-center ml-2 mr-2'>↻</h1>
        </button>
      </div>
    </header>
  );
}