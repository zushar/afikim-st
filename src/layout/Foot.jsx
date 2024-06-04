import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import html2canvas from 'html2canvas';

export default function Foot() {
  
  const { elements, legs, workspaceRef, deleteAll } = useContext(AppContext);

  const downloadWorkspaceImage = () => {
    html2canvas(workspaceRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'workspace.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const downloadListData = () => {
    const shapeCounts = elements.reduce((acc, el) => {
      const shapeKey = `${el.type} ${el.moduleData.dimensions}`;
      if (!acc[shapeKey]) {
        acc[shapeKey] = 0;
      }
      acc[shapeKey] += 1;
      return acc;
    }, {});

    const legCounts = legs.reduce((acc, leg) => {
      const key = `${leg.hight}-${leg.color}`;
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1;
      return acc;
    }, {});

    let listData = "Shapes= \n";
    Object.entries(shapeCounts).forEach(([key, count]) => {
      listData += `${key}=  ${count}\n`;
    });

    listData += "\nLegs= \n";
    Object.entries(legCounts).forEach(([key, count]) => {
      const [hight, color] = key.split('-');
      listData += `${hight} (${color}) = ${count * 4}\n`;
    });

    const blob = new Blob([listData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'list_data.txt';
    link.click();
  };

  return (
    <footer className='bg-blue-800 flex justify-between'>
      <button className='bg-pink-600 p-2 m-1 text-white' onClick={downloadWorkspaceImage}>
        <h1 className='text-center'>הורדה של הסקיצה</h1>
      </button>
      <button className='bg-purple-600 p-2 m-1 text-white' onClick={downloadListData}>
        <h1 className='text-center'>הורדה של הנתונים</h1>
      </button>
      <button className='bg-purple-600 p-2 m-1 text-white' onClick={deleteAll}>
        <h1 className='text-center'>מחיקת הכול</h1>
      </button>
    </footer>
  );
}

