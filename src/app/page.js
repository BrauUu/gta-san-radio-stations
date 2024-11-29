"use client"

import RadioList from './components/RadioList/index.js'
import { PlayIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import { RadioContext } from './contexts/RadioContext/index';

export default function Home() {

  function play() {
    console.log('play')
  }

  return (
    <RadioContext.Provider value={10}>
      <RadioList/>
      <div className='flex flex-row gap-5'>
        <button id='previous-radio' className='h-10'>
          <BackwardIcon className='h-full'></BackwardIcon>
        </button>
        <button id='play' className='h-10' onClick={play}>
          <PlayIcon className='h-full'></PlayIcon>
        </button>
        <button id='next-radio' className='h-10'>
          <ForwardIcon className='h-full'></ForwardIcon>
        </button>
      </div>
    </RadioContext.Provider>
  );
};