import { useEffect, useContext, useState, useRef } from "react";
import { GlobalContext } from '../../contexts/GlobalContext';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function YouTubePlayer({ videoId }) {

  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  const {
    setIsPlaying,
    registerMethod,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.id = 'youtube-player'
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = () => {
        window.onYouTubeIframeAPIReady = () => {
          new window.YT.Player(playerRef.current, {
            height: "315",
            width: "560",
            videoId: videoId,
            events: {
              onReady: (event) => {
                setPlayer(event.target);
                event.target.playVideo()
                event.target.seekTo(randomIntFromInterval(0, event.target.getDuration()))
                registerMethod("play", () => {
                  if (event.target) {
                    event.target.playVideo();
                    setIsPlaying(true)
                  }
                });
                registerMethod("pause", () => {
                  if (event.target) {
                    event.target.pauseVideo();
                    setIsPlaying(false)
                  }
                });
              }
            },
          });
        };
      };
      document.body.appendChild(script);
    } else if (window.YT) {
      player.loadVideoById(videoId)
    }
  }, [videoId]);

  return (
    <div ref={playerRef}>
    </div>
  );
};