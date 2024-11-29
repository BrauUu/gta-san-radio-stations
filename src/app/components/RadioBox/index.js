export default function RadioBox({radio, setActualRadioId}) {
    const {
        id, 
        name, 
        videoUrl, 
        image
    } = radio
    
    return (
        <div>
            <img className="h-40"
                src={`../images/${image}`}
                onClick={() => {
                    setActualRadioId(id)
                }}
            />
        </div>
    )
}