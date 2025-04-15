import { useContext, useState, useEffect, useRef } from 'react'
import { GlobalContext } from '@/app/contexts/GlobalContext'

import ChangeRadioSound from '../../../../public/audios/change-radio.mp3';

export default function SongInfo() {

    const {
        currentRadio,
        player,
        volume,
        isMuted
    } = useContext(GlobalContext)

    const [currentSong, setCurrentSong] = useState('not-played')
    const currentSongRef = useRef(null)

    const [ChangeRadioSoundAudio, setChangeRadioSoundAudio] = useState(null)

    useEffect(() => {
        setChangeRadioSoundAudio(new Audio(ChangeRadioSound))
    }, [])

    useEffect(() => {
        currentSongRef.current = currentSong;
    }, [currentSong])

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (player) {
                const currentTime = Number.parseInt(player.getCurrentTime());
                if (typeof(currentSongRef.current) != Object || currentTime > currentSongRef.current.endTime) {
                    const songs = currentRadio.songs;
                    let isAdvertisement = true;
                    songs.forEach(song => {
                        if (song.startTime <= currentTime && song.endTime >= currentTime) {
                            setCurrentSong(song);
                            currentSongRef.current = song;
                            isAdvertisement = false;
                        }
                    });
                    if (isAdvertisement && currentTime > 0) {
                        setCurrentSong('advertisement');
                        currentSongRef.current = null;
                    }
                }
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            if(currentSongRef.current != 'not-played'){
                setCurrentSong('tuning');
            }
            currentSongRef.current = null;
        };
    }, [player, currentRadio]);

    const getSongDOM = () => {

        if (currentSong === 'not-played') {
            return (
                <div className='flex flex-col justify-center h-full hover:text-font-color-secondary'>
                </div>
            )
        }
        if (currentSong === 'tuning') {
            if(ChangeRadioSoundAudio){
                ChangeRadioSoundAudio.loop = true
                ChangeRadioSoundAudio.volume = isMuted ? 0 : volume / 100
                ChangeRadioSoundAudio.play()
            }
            return (
                <div className='flex flex-col justify-center h-full hover:text-font-color-secondary'>
                    <p className='text-5xl font-black text-center'>Tuning...</p>
                </div>
            )
        }
        if(ChangeRadioSoundAudio){
            ChangeRadioSoundAudio.pause()
        }
        if (currentSong === 'advertisement') {
            return (
                <div className='flex flex-col justify-center h-full hover:text-font-color-secondary'>
                    <p className='text-5xl font-black text-center'>Advertisement</p>
                </div>
            )
        }

        return (
            <div className='flex flex-col items-center hover:text-font-color-secondary'>
                <p className='text-5xl font-black text-center'>{currentSong.name}</p>
                <p className='text-3xl font-bold text-center'>{currentSong.author}</p>
            </div>
        )

    }

    return (
        <div className='flex flex-col items-center my-4 min-h-[84px] px-5'>
            {
                getSongDOM()
            }
        </div>
    )
}