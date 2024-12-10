"use client"

import RadioList from './sections/RadioList/index.js'
import ControlPanel from './sections/ControlPanel/index.js'
import SongInfo from './sections/SongInfo/index.js'
import { GlobalProvider } from './contexts/GlobalContext';

export default function Home() {

  return (
    <GlobalProvider>
      <div className='flex flex-col justify-center h-screen'>
        <RadioList />
        <SongInfo />
        <ControlPanel />
      </div>
    </GlobalProvider>
  );
};