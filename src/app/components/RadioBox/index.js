export default function RadioBox({ radio, setActualRadioId, actualRadioId }) {
    const {
        id,
        name,
        videoUrl,
        image
    } = radio

    return (
        <div
            className="flex items-center justify-center shrink-0 w-1/6 carrousel-item"
            id={`radio-${id}`}
        >
            <img className={
                `
                transition-[height] ease-linear duration-150
                ${actualRadioId == id ? 'h-80' : 'h-44'}
                `
            }
                src={`../images/${image}`}
                onClick={() => {
                    setActualRadioId(id)
                }}
            />
        </div>
    )
}