"use client"

import RadioList from './sections/RadioList/index.js'
import ControlPanel from './sections/ControlPanel/index.js'
import SongInfo from './sections/SongInfo/index.js'
import { GlobalProvider } from './contexts/GlobalContext';

export default function Home() {

  return (
    <>
    <p className='title text-7xl pl-10 pt-10 h-[10%]'>Radio Stations</p>
    <GlobalProvider>
      <div className='flex flex-col justify-center h-[90%]'>
        <RadioList />
        <SongInfo />
        <ControlPanel />
      </div>
    </GlobalProvider>
    </>
  );
};