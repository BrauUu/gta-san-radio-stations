"use client"

import { GlobalContext } from '../../contexts/GlobalContext';
import { useContext, useEffect, useState } from 'react'

import radiosList from '../../data/radiosList'

import RadioBox from '../../components/RadioBox/index.js'
import YouTubePlayer from '../../components/YouTubePlayer/index.js'

import "./index.css"

export default function RadioList() {

    const {
        currentRadio,
        setCurrentRadio,
    } = useContext(GlobalContext);

    useEffect(() => {

        const wrapper = document.querySelector('#wrapper')
        const carrouselItens = document.querySelectorAll('.carrousel-item')

        function scrollToItem(id) {

            carrouselItens.forEach((node) => {
                if (node.id == `radio-${id}`) {
                    node.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    })
                    return
                }
            })
        }

        scrollToItem(currentRadio.id)
    }, [currentRadio])

    return (
        <div>
            <div>
                {
                    currentRadio['video-url'] ?
                        <YouTubePlayer videoId={currentRadio['video-url']}></YouTubePlayer>
                        :
                        undefined
                }
            </div>
            <div className='flex overflow-hidden'>
                <div className='flex w-full flex-row h-80' id='wrapper'>
                    {
                        radiosList.map(radio => {
                            return <RadioBox key={radio['name']} radio={radio} setCurrentRadio={setCurrentRadio} currentRadio={currentRadio} />
                        })

                    }
                </div>
            </div>

        </div>
    )
}