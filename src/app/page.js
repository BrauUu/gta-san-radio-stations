"use client"

import RadioList from './sections/RadioList/index.js'
import ControlPanel from './sections/ControlPanel/index.js'
import SongInfo from './sections/SongInfo/index.js'
import { GlobalProvider } from './contexts/GlobalContext';
import { useEffect, useState } from 'react';

export default function Home() {

  const [backgroundImage, setBackgroundImage] = useState(null)

  useEffect(() => {
    const min = 1
    const max = 3
    const image = `bg-[url(../../public/images/background${parseInt(Math.random() * (max - min + 1) + min)}.png)]`
    setBackgroundImage(image)
  }, [])

  return (
    <div className={`${backgroundImage} bg-right-top bg-no-repeat bg-[length:800px] bg-black h-screen`}>
      <p className='title text-7xl pl-10 pt-10 h-[10%]'>Radio Stations</p>
      <GlobalProvider>
        <div className='flex flex-col justify-center h-[90%]'>
          <RadioList />
          <SongInfo />
          <ControlPanel />
        </div>
      </GlobalProvider>
    </div>
  );
};