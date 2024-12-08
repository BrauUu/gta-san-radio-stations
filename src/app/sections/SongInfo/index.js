import { useContext, useState, useEffect, useRef } from 'react'
import { GlobalContext } from '@/app/contexts/GlobalContext'

export default function SongInfo() {

    const {
        currentRadio,
        player
    } = useContext(GlobalContext)

    const [currentSong, setCurrentSong] = useState(null)
    const currentSongRef = useRef(null)

    useEffect(() => {
        currentSongRef.current = currentSong;
    }, [currentSong])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (player) {
                const currentTime = Number.parseInt(player.getCurrentTime());
                if (!currentSongRef.current || currentTime > currentSongRef.current.endTime) {
                    const songs = currentRadio.songs;
                    let isAdvertisement = true;
                    songs.forEach(song => {
                        if (song.startTime <= currentTime && song.endTime >= currentTime) {
                            setCurrentSong(song);
                            currentSongRef.current = song; 
                            isAdvertisement = false;
                        }
                    });
                    if (isAdvertisement) {
                        setCurrentSong(null);
                        currentSongRef.current = null; 
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            setCurrentSong(null);
            currentSongRef.current = null;
        };
    }, [player, currentRadio]);

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