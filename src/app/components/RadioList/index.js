"use client"

import { useContext } from 'react';
import { RadioContext } from '../../contexts/RadioContext/index';
import { useState } from 'react'

import radiosList from '../../data/radiosList'

import RadioBox from '../RadioBox/index.js'

export default function RadioList() {

    const { actualRadioId, setActualRadioId } = useContext(RadioContext);

    function getRadioById(id) {
        for (let i = 0; i < radiosList.length; i++) {
            const radio = radiosList[i]
            if (radio['id'] == id) {
                return radio
            }
        }
        return null
    }

    return (
        <div>
            {
                getRadioById(actualRadioId) ?
                    <iframe
                        width="1920"
                        height="768"
                        src={`https://www.youtube.com/embed/${getRadioById(actualRadioId)['video-url']}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                    >
                    </iframe>
                    : 
                    undefined
            }
            <div className='flex flex-row'>
                {
                    radiosList.map(radio => {
                        return <RadioBox key={radio['name']} radio={radio} setActualRadioId={setActualRadioId} />
                    })
                }
            </div>
        </div>
    )
}