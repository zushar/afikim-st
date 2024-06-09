import React, {useContext} from 'react';
import StageModule from './StageModule';
import { AppContext } from '../context/AppContext';

const StageSelecton = () => {
  const { modules } = useContext(AppContext);
  return (
  <div>
    <h1 className="bg-blue-800 text-white text-center rounded">בחירת במות</h1>
    <div className="bg-blue-800 overflow-y-scroll h-full flex flex-col">
      {modules.map(module => (
        <div key={module.id} className="p-1 ">
          <StageModule module={module} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default StageSelecton