import { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '@/app/contexts/GlobalContext'

export default function SongInfo() {

    const {
        currentRadio,
        player
    } = useContext(GlobalContext)

    const [currentSong, setCurrentSong] = useState(null)


    const changeCurrentSong = (currentTime) => {
        const songs = currentRadio.songs
        let isAdvertisement = true
        songs.forEach(song => {
            if (song.startTime <= currentTime && song.endTime >= currentTime) {
                setCurrentSong(song)
                isAdvertisement = false
                return
            }
        });
        if (isAdvertisement) setCurrentSong(null)
    }

    const isCurrentSongChanged = () => {
        const currentTime = player.getCurrentTime()
        if (!currentSong || currentTime > currentSong.endTime) {
            changeCurrentSong(currentTime)
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            isCurrentSongChanged();
        }, 1000);

        return () => {
            clearInterval(intervalId);
            setCurrentSong(null)
        }
    }, [currentRadio, player])

    return (
        <div>
            {
                currentSong ?
                    <p>{currentSong.name}</p>
                    :
                    <p>Advertisement</p>
            }
        </div>
    )
}