import { useContext } from 'react';
import { Play, SkipForward, SkipBack } from "@phosphor-icons/react";
import { GlobalContext } from '../../contexts/GlobalContext';

import radiosList from '../../data/radiosList';
import HoverMenuSound from '../../../../public/audios/hover.wav';
import SelectMenuSound from '../../../../public/audios/select.mp3';

export default function ControlPanel() {

    const {
        currentRadio,
        setCurrentRadio,
        callMethod
    } = useContext(GlobalContext)


    const HoverMenuSoundAudio = new Audio(HoverMenuSound)
    const SelectMenuSoundAudio = new Audio(SelectMenuSound)

    const play = () => {
        callMethod('play')
    }

    const next = () => {
        let radioIndex = currentRadio.id + 1
        if (radioIndex >= 10) {
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

    return (
        <div className='flex flex-row justify-center gap-5'>
            <button id='previous-radio' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <SkipBack size={32} weight="fill" onClick={previous}/>
            </button>
            <button id='play' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <Play size={40} weight="fill" onClick={play} />
            </button>
            <button id='next-radio' className='h-10 hover:text-font-color-secondary' onClick={() => playSound(SelectMenuSoundAudio)} onMouseEnter={() => playSound(HoverMenuSoundAudio)}>
                <SkipForward size={40} weight="fill" onClick={next}/>
            </button>
        </div>
    )
}