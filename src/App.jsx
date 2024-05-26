import './App.css';

import Header from './layout/Header';
import ContentMain from './layout/ContentMain';
import Foot from './layout/Foot';

function App() {


  return (
    <div className='bg-pink-600 h-screen w-screen overflow-hidden flex flex-col justify-between'>
      <Header />
      <ContentMain />
      <Foot />
    </div>
  )
}

export default App
