import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';

export default function List() {
  const { elements, legs, setListRef } = useContext(AppContext);
  const listRef = useRef(null);
  
  useEffect(() => {
    setListRef(listRef);
  }, [setListRef]);

  // Calculate the counts of each shape type and dimensions
  const shapeCounts = elements.reduce((acc, el) => {
    const shapeKey = el.type + el.moduleData.dimensions;
    if (!acc[shapeKey]) {
      acc[shapeKey] = 0;
    }
    acc[shapeKey] += 1;
    return acc;
  }, {});

  // Calculate the counts of each leg type and color
  const legCounts = legs.reduce((acc, leg) => {
    const key = `${leg.hight}-${leg.color}`;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += 1;
    return acc;
  }, {});

  return (
    <div className='bg-blue-800 overflow-y-scroll h-full flex flex-col'
        ref={listRef}>
      <div className='bg-white p-2 m-1 rounded'
        id='ligs'>
        <h1 className='text-center'>כמות רגליים</h1>
        {Object.entries(legCounts).map(([key, count]) => {
          const [hight, color] = key.split('-');
          return (
            <div key={key} className='p-2 w-full rounded-md'>
              <div className='p-2 m-1 text-white rounded-md' style={{ backgroundColor: color }}>
                <p className='text-center'>{`${hight} = ${count * 4}`}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='bg-white p-2 m-1 rounded-md'
        id='stge'>
        <h1 className='text-center m-1'>כמות במות</h1>
        {Object.entries(shapeCounts).map(([shapeKey, count]) => (
          <div key={shapeKey} className=' w-full'>
            <div className='bg-pink-500 m-1 p-1 rounded-md'>
              <p className='text-center'>{`${shapeKey} = ${count}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
