import React, { useState } from 'react';
import StageSelecton from '../components/StageSelecton';
import Workspace from '../components/Workspace';
import List from '../components/List';

export default function ContentMain() {


  return (
    <div className='m-1 flex justify-between h-5/6'>
      <StageSelecton />
      <Workspace />
      <List />
    </div>
  );
}
