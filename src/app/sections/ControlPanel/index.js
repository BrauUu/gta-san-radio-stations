import { PlayIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'

export default function ControlPanel() {

    return (
        <div className='flex flex-row gap-5'>
            <button id='previous-radio' className='h-10'>
                <BackwardIcon className='h-full'></BackwardIcon>
            </button>
            <button id='play' className='h-10'>
                <PlayIcon className='h-full'></PlayIcon>
            </button>
            <button id='next-radio' className='h-10'>
                <ForwardIcon className='h-full'></ForwardIcon>
            </button>
        </div>
    )
}