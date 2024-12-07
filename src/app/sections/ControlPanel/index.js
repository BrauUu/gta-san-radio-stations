import { useContext } from 'react'
import { PlayIcon, BackwardIcon, ForwardIcon, } from '@heroicons/react/24/outline'
import { GlobalContext } from '../../contexts/GlobalContext'

import radiosList from '../../data/radiosList'

export default function ControlPanel() {

    const { 
        currentRadio,
        setCurrentRadio,
        callMethod 
    } = useContext(GlobalContext)

    const play = () => {
        callMethod('play')
    }

    const next = () => {
        let radioIndex = currentRadio.id + 1
        if(radioIndex >= 10) {
            radioIndex = 0
        }
        setCurrentRadio(radiosList[radioIndex])
    }

    const previous = () => {
        let radioIndex = currentRadio.id - 1
        if(radioIndex <= -1) {
            radioIndex = 10
        }
        setCurrentRadio(radiosList[radioIndex])
    }

    return (
        <div className='flex flex-row gap-5'>
            <button id='previous-radio' className='h-10'>
                <BackwardIcon className='h-full' onClick={previous}></BackwardIcon>
            </button>
            <button id='play' className='h-10'> 
                <PlayIcon className='h-full' onClick={play}></PlayIcon>
            </button>
            <button id='next-radio' className='h-10'>
                <ForwardIcon className='h-full' onClick={next}></ForwardIcon>
            </button>
        </div>
    )
}