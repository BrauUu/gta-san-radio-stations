import { useContext, useState, useEffect, useRef } from 'react'
import { GlobalContext } from '@/app/contexts/GlobalContext'

export default function SongInfo() {

    const {
        currentRadio,
        player
    } = useContext(GlobalContext)

    const [currentSong, setCurrentSong] = useState(undefined)
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
            setCurrentSong(undefined);
            currentSongRef.current = null;
        };
    }, [player, currentRadio]);

    const getSongDOM = () => {
        if (currentSong) {
            return (
                <div className='flex flex-col items-center hover:text-font-color-secondary'>
                    <p className='text-5xl font-black'>{currentSong.name}</p>
                    <p className='text-3xl font-bold'>{currentSong.author}</p>
                </div>
            )
        }
        if (currentSong === null) {
            return (
                <div className='flex flex-col justify-center h-full hover:text-font-color-secondary'>
                    <p className='text-5xl font-black'>Advertisement</p>
                </div>
            )
        }
        if (currentSong === undefined) {
            return (
                <div className='flex flex-col justify-center h-full hover:text-font-color-secondary'>
                    <p className='text-5xl font-black'>Tuning...</p>
                </div>
            )
        }
    }

    return (
        <div className='flex flex-col items-center my-4 min-h-[84px]'>
            {
                getSongDOM()
            }
        </div>
    )
}