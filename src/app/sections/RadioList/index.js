"use client"

import { GlobalContext } from '../../contexts/GlobalContext';
import { useContext, useEffect } from 'react'

import radiosList from '../../data/radiosList'

import RadioBox from '../../components/RadioBox/index.js'
import YouTubePlayer from '../../components/YouTubePlayer/index.js'

export default function RadioList() {

    const {
        actualRadioId,
        setActualRadioId
    } = useContext(GlobalContext);

    function getRadioById(id) {
        for (let i = 0; i < radiosList.length; i++) {
            const radio = radiosList[i]
            if (radio['id'] == id) {
                return radio
            }
        }
        return null
    }

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
                }
            })
        }

        scrollToItem(actualRadioId)
    }, [actualRadioId])

    return (
        <div>
            <div>
                {
                    getRadioById(actualRadioId)['video-url'] ?
                        <YouTubePlayer videoId={getRadioById(actualRadioId)['video-url']}></YouTubePlayer>
                        :
                        undefined
                }
            </div>
            <div className='flex overflow-hidden'>
                <div className='flex w-full flex-row h-80' id='wrapper'>
                    {
                        radiosList.map(radio => {
                            return <RadioBox key={radio['name']} radio={radio} setActualRadioId={setActualRadioId} actualRadioId={actualRadioId} />
                        })

                    }
                </div>
            </div>
        </div>
    )
}