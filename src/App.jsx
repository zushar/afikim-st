import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Header from './layout/Header';
import ContentMain from './layout/ContentMain';
import Foot from './layout/Foot';
import Modal from './components/Modal';

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      setShowConfirmation(true);
      e.returnValue = ''; // Chrome requires returnValue to be set
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleConfirmLeave = () => {
    setShowConfirmation(false);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.location.reload();
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
  };

  return (
    <div className='bg-pink-600 h-screen w-screen overflow-hidden flex flex-col justify-between'>
      <Header />
      <ContentMain />
      <Foot />
      {showConfirmation && (
        <Modal
          message="התרחש שינוי בעמוד, האם אתה בטוח שברצונך לעזוב?"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </div>
  );
}

export default App;