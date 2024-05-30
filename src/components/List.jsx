import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function List() {
  const { elements, legs } = useContext(AppContext);

  // Calculate the counts of each shape type
  const shapeCounts = elements.reduce((acc, el) => {
    if (!acc[el.type]) {
      acc[el.type] = 0;
    }
    acc[el.type] += 1;
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
    <div className='bg-blue-800 p-2 m-1 overflow-y-scroll h-full flex flex-col'>
      <div className='bg-white p-2 m-1'>
        <h1 className='text-center'>רגליים</h1>
        {Object.entries(legCounts).map(([key, count]) => {
          const [hight, color] = key.split('-');
          return (
            <div key={key} className='p-2 w-full'>
              <div className='p-2 m-1 text-white' style={{ backgroundColor: color }}>
                <p className='text-center'>{`${hight} = ${count * 4}`}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className='bg-white p-2 m-1'>
        <h1 className='text-center'>במות</h1>
        {Object.entries(shapeCounts).map(([shape, count]) => (
          <div key={shape} className='p-2 w-full'>
            <div className='bg-white p-2 m-1'>
              <p className='text-center'>{`${shape} = ${count}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
