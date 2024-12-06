import { useContext } from 'react'
import { PlayIcon, BackwardIcon, ForwardIcon, PauseIcon } from '@heroicons/react/24/outline'
import { GlobalContext } from '../../contexts/GlobalContext'

export default function ControlPanel() {

    const { 
        actualRadioId,
        setActualRadioId,
        callMethod 
    } = useContext(GlobalContext)

    const play = () => {
        callMethod('play')
    }

    const next = () => {
        let newActualRadioId = actualRadioId + 1
        if(actualRadioId === 11) {
            newActualRadioId = 1
        }
        setActualRadioId(newActualRadioId)
    }

    const previous = () => {
        let newActualRadioId = actualRadioId - 1
        if(actualRadioId === 1) {
            newActualRadioId = 11
        }
        setActualRadioId(newActualRadioId)
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