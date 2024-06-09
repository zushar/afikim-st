import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import html2canvas from 'html2canvas';

export default function Foot() {
  const { elements, legs, workspaceRef, deleteAll, listRef } = useContext(AppContext);
  const [projectName, setProjectName] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const projectNameRef = useRef(null);
  const projectOwnerRef = useRef(null);

  useEffect(() => {
    if(projectName !== '' || projectOwner !== ''){
    localStorage.setItem('projectName', projectName);
    localStorage.setItem('projectOwner', projectOwner);
    }
  }, [projectName, projectOwner]);

//if page is refreshed, the project name and owner will be saved
  useEffect(() => {
    const savedProjectName = localStorage.getItem('projectName');
    const savedProjectOwner = localStorage.getItem('projectOwner');
    if (savedProjectName) {
      setProjectName(savedProjectName);
    }
    if (savedProjectOwner) {
      setProjectOwner(savedProjectOwner);
    }
  }, []);

  const downloadCombinedImage = async () => {
  if (!workspaceRef.current || !listRef.current) {
    console.error('References to workspace or list are not set.');
    return;
  }
  
  const ligsElement = listRef.current.querySelector('#ligs');
  const stgeElement = listRef.current.querySelector('#stge');
  try {
    const ligsCanvas = await html2canvas(ligsElement, {
      windowHeight: ligsElement.scrollHeight
    });

    const stgeCanvas = await html2canvas(stgeElement, {
      windowHeight: stgeElement.scrollHeight
    });

    const workspaceCanvas = await html2canvas(workspaceRef.current);

    const workspaceImage = new Image();
    workspaceImage.src = workspaceCanvas.toDataURL('image/png', 1.0);

    const ligsImage = new Image();
    ligsImage.src = ligsCanvas.toDataURL('image/png', 1.0);

    const stgeImage = new Image();
    stgeImage.src = stgeCanvas.toDataURL('image/png', 1.0);

    workspaceImage.onload = () => {
      ligsImage.onload = () => {
        stgeImage.onload = () => {
          const combinedCanvas = document.createElement('canvas');
          const context = combinedCanvas.getContext('2d');

          const combinedWidth = workspaceCanvas.width + ligsCanvas.width + stgeCanvas.width;
          const combinedHeight = Math.max(workspaceCanvas.height, ligsCanvas.height, stgeCanvas.height);

          combinedCanvas.width = combinedWidth;
          combinedCanvas.height = combinedHeight;

          context.drawImage(stgeImage, 0, 0);
          context.drawImage(workspaceImage, stgeImage.width, 0);
          context.drawImage(ligsImage, workspaceCanvas.width + stgeImage.width, 0);

          // Draw project name and owner
          if (projectName !== '') {
            context.font = '60px Arial';
            context.fillStyle = 'blue';
            context.fillText(`שם הפרויקט: ${projectName}`, stgeImage.width, 40);
          }
          if (projectOwner !== '') {
            context.font = '60px Arial';
            context.fillStyle = 'blue';
            context.fillText(`שם הבעלים: ${projectOwner}`, workspaceCanvas.width-stgeImage.width, 40);
          }

          const combinedImage = combinedCanvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = combinedImage;
          link.download = 'combined_image.png';
          link.click();
        };
      };
    };
  } catch (error) {
    console.error('Error capturing images:', error);
  }
};

  const downloadListData = () => {
    const shapeCounts = elements.reduce((acc, el) => {
      const shapeKey = `${el.type} ${el.moduleData.dimensions}`;
      acc[shapeKey] = (acc[shapeKey] || 0) + 1;
      return acc;
    }, {});

    const legCounts = legs.reduce((acc, leg) => {
      const key = `${leg.hight}-${leg.color}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    let listData = "במות:\n";
    Object.entries(shapeCounts).forEach(([key, count]) => {
      listData += `${key}=  ${count}\n`;
    });

    listData += "\nרגליים:\n";
    Object.entries(legCounts).forEach(([key, count]) => {
      const [hight] = key.split('-');
      listData += `${hight} = ${count * 4}\n`;
    });

    const blob = new Blob([listData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'list_data.txt';
    link.click();
  };

  return (
    <footer className='bg-blue-800 flex justify-between '>
      <button className='bg-pink-600 p-2 m-1 ml-2 text-white rounded-md' onClick={downloadCombinedImage}>
        <h1 className='text-center'>הורדה של הסקיצה ורשימת חלקים</h1>
      </button>
      <button className='bg-pink-600 p-2 m-1 text-white rounded-md' onClick={downloadListData}>
        <h1 className='text-center'>הורדת רשימת חלקים</h1>
      </button>
      <button className='bg-pink-600 p-2 m-1 mr-2 text-white rounded-md' onClick={()=>{
        deleteAll();
        setProjectName('');
        setProjectOwner('');
        localStorage.removeItem('projectName');
        localStorage.removeItem('projectOwner');
        }}>
        <h1 className='text-center'>מחיקת הכול</h1>
      </button>
      <div className='flex flex-row'
        ref={projectNameRef}>
        <h1 className='text-white text-center mt-3 bg-blue-800'>שם הפרויקט:</h1>
        <input className='bg-pink-600 p-2 m-1 mr-2 text-white rounded-md' type='text' placeholder='שם הפרויקט' value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      </div>
      <div className='flex flex-row'
        ref={projectOwnerRef}>
        <h1 className='text-white text-center mt-3 bg-blue-800'>שם הבעלים:</h1>
        <input className='bg-pink-600 p-2 m-1 mr-2 text-white rounded-md' type='text' placeholder='שם הבעלים' value={projectOwner} onChange={(e) => setProjectOwner(e.target.value)} />
      </div>
    </footer>
  );
}
