"use client"

import { useContext } from 'react';
import { RadioContext } from '../../contexts/RadioContext/index';
import { useState } from 'react'

import radiosList from '../../data/radiosList'

import RadioBox from '../RadioBox/index.js'

export default function RadioList(props) {

    // const [actualRadio, setActualRadio] = useState(radiosList[0])
    const actualRadio = useContext(RadioContext);
    console.log(actualRadio)

    return (
        <div>
            <iframe
                width="0"
                height="0"
                src={`https://www.youtube.com/embed/${actualRadio['video-url']}`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
            >
            </iframe>
            <div className='flex flex-row'>
                {
                    radiosList.map(radio => {
                        return <RadioBox key={radio['name']} videoUrl={radio["video-url"]} image={radio['image']} />
                    })
                }
            </div>
        </div>
    )
}