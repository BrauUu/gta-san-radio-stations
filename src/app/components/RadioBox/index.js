export default function RadioBox({ radio, setCurrentRadio, currentRadio }) {
    const {
        id,
        name,
        videoUrl,
        image
    } = radio

    return (
        <div
            className="flex items-center justify-center shrink-0 w-1/6 min-w-80 carrousel-item"
            id={`radio-${id}`}
        >
            <img className={
                `
                cursor-pointer
                transition-[height] ease-linear duration-150
                ${currentRadio.id == id ? 'h-80' : 'h-44'}
                `
            }
                src={`../images/${image}`}
                onClick={() => {
                    setCurrentRadio(radio)
                }}
            />
        </div>
    )
}