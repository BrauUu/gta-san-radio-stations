import { useContext, useEffect, useRef, useState } from 'react';
import { Play, SkipForward, SkipBack, SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleX, SpeakerSimpleNone} from "@phosphor-icons/react";
import { GlobalContext } from '../../contexts/GlobalContext';

import radiosList from '../../data/radiosList';
import HoverMenuSound from '../../../../public/audios/hover.wav';
import SelectMenuSound from '../../../../public/audios/select.mp3';

export default function ControlPanel() {

    const {
        currentRadio,
        setCurrentRadio,
        volume,
        setVolume,
        callMethod
    } = useContext(GlobalContext)

    const [isMuted, setIsMuted] = useState(false)
    const [HoverMenuSoundAudio, setHoverMenuSoundAudio] = useState(null)
    const [SelectMenuSoundAudio, setSelectMenuSoundAudio] = useState(null)
    const isHovering = useRef(false)

    const play = () => {
        callMethod('play')
    }

    const next = () => {
        let radioIndex = currentRadio.id + 1
        if (radioIndex > 10) {
            radioIndex = 0
        }
        setCurrentRadio(radiosList[radioIndex])
    }

    const previous = () => {
        let radioIndex = currentRadio.id - 1
        if (radioIndex <= -1) {
            radioIndex = 10
        }
        setCurrentRadio(radiosList[radioIndex])
    }

    const playSound = (audio) => {
        audio.play()
    }

    useEffect(() => {
        setHoverMenuSoundAudio(new Audio(HoverMenuSound))
        setSelectMenuSoundAudio(new Audio(SelectMenuSound))
    },[])

    const getVolumeDOM = () => {
        if (isMuted) {
            return (
                <SpeakerSimpleX weight="fill" size={40} />
            )
        }
        if(volume == 0) {
            return(
                <SpeakerSimpleNone weight="fill" size={40} />
            )
        }
        if (volume >= 50) {
            return (
                <SpeakerSimpleHigh weight="fill" size={40} />
            )
        }
        return (
            <SpeakerSimpleLow weight="fill" size={40} />
        )
    }


    const changeVolumeInputVisibility = (isVisible) => {
        const volumeInput = document.querySelector('#volume-input')
        if (isVisible) {
            volumeInput.classList.remove('hidden')
            return
        }
        volumeInput.classList.add('hidden')
    }

    const muteOrUnmute = () => {
        setIsMuted(!isMuted)
        callMethod('muteOrUnmute')
    }

    return (
        <div className='flex flex-row justify-center items-center gap-5'>
            <button id='previous-radio' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <SkipBack size={32} weight="fill" onClick={previous} />
            </button>
            <button id='play' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <Play size={40} weight="fill" onClick={play} />
            </button>
            <button id='next-radio' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <SkipForward size={40} weight="fill" onClick={next} />
            </button>
            <div
                className='flex items-center h-10 w-10 hover:text-font-color-secondary'
                onClick={() => {
                    muteOrUnmute()
                    playSound(SelectMenuSoundAudio)
                }}
                onMouseEnter={() => {
                    if (!isHovering.current){
                        playSound(HoverMenuSoundAudio)
                    }
                    changeVolumeInputVisibility(true)
                    isHovering.current = true
                }}
                onMouseLeave={() => {
                    isHovering.current = false
                    changeVolumeInputVisibility(false)
                }}
            >
                {
                    getVolumeDOM()
                }
            </div>
            <div
                className='flex fixed left-[calc(50%+106px)] h-10'
                onMouseEnter={() => {
                    changeVolumeInputVisibility(true)
                }}
                onMouseLeave={() => {
                    changeVolumeInputVisibility(false)
                }}
            >
                <input
                    id="volume-input"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    className='mx-2 hidden w-28'
                />
            </div>
        </div>
    )
}