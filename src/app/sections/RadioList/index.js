"use client"

import { GlobalContext } from '../../contexts/GlobalContext';
import { useState, useContext, useEffect } from 'react'

import radiosList from '../../data/radiosList'

import RadioBox from '../../components/RadioBox/index.js'
import YouTubePlayer from '../../components/YouTubePlayer/index.js'

export default function RadioList() {

    const {
        actualRadioId,
        setActualRadioId,
        isPlaying,
        setIsPlaying
    } = useContext(GlobalContext);

    function getVideoUrlByRadioId(id) {
        for (let i = 0; i < radiosList.length; i++) {
            const radio = radiosList[i]
            if (radio['id'] == id) {
                return radio['video-url']
            }
        }
        return null
    }

    return (
        <div>
            {
                getVideoUrlByRadioId(actualRadioId) ?
                    <YouTubePlayer videoId={getVideoUrlByRadioId(actualRadioId)}></YouTubePlayer>
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