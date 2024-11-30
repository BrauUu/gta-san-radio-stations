"use client"

import { useState } from 'react'

import RadioList from './sections/RadioList/index.js'
import ControlPanel from './sections/ControlPanel/index.js'
import { RadioProvider } from './contexts/RadioContext/index';

export default function Home() {

  return (
    <RadioProvider>
      <RadioList/>
      <ControlPanel/>
    </RadioProvider>
  );
};