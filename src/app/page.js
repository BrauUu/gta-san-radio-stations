"use client"

import { useState } from 'react'

import RadioList from './sections/RadioList/index.js'
import ControlPanel from './sections/ControlPanel/index.js'
import { GlobalProvider } from './contexts/GlobalContext';

export default function Home() {

  return (
    <GlobalProvider>
      <RadioList/>
      <ControlPanel/>
    </GlobalProvider>
  );
};