
export default function RadioBox(props) {
    const {videoUrl, image} = props
    return (
        <div>
            <img className="h-40"
                src={`../images/${image}`}
            />
        </div>
    )
}