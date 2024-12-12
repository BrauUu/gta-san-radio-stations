import Image from 'next/image'
import "./index.css"

export default function RadioBox({ radio, setCurrentRadio, currentRadio }) {
    const {
        id,
        name,
        image
    } = radio

    return (
        <div
            className={`
                flex items-center justify-center shrink-0 
                w-1/6 min-w-80 
                carrousel-item
                `}
            id={`radio-${id}`}
        >
            <Image className={
                `
                transition-[height] ease-linear duration-150
                ${currentRadio.id == id ? 'h-80' : 'h-44'}
                w-auto
                `
            }
                height={480}
                width={480}
                alt={name}
                src={`/images/${image}`}
                onClick={() => {
                    setCurrentRadio(radio)
                }}
            />
        </div>
    )
}