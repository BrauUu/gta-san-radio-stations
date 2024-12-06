import { useEffect, useContext, useState, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

function getRadioActualTime(radioDuration) {
  return Number.parseInt(Date.now() / 1000) % Number.parseInt(radioDuration)
}

export default function YouTubePlayer({ videoId }) {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  const {registerMethod } = useContext(GlobalContext);

  const loadVideoAsync = async (videoId) => {
    if (!player) throw new Error("Player não inicializado");

    player.cueVideoById(videoId);
    
    return new Promise((resolve, reject) => {
      const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.CUED) {
          resolve();
        }
        if (event.data === window.YT.PlayerState.ENDED) {
          player.seekTo(
            getRadioActualTime(player.getDuration())
          )
          resolve()
        }
      };

      player.addEventListener("onStateChange", onPlayerStateChange);
    });
  };

  useEffect(() => {
    const initializePlayer = async () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onload = () => {
          window.onYouTubeIframeAPIReady = async () => {
            new window.YT.Player(playerRef.current, {
              height: "300",
              width: "500",
              videoId: videoId,
              playerVars: {
                loop: 1,
                playlist: videoId,
              },
              events: {
                onReady: async (event) => {
                  setPlayer(event.target)
                  event.target.seekTo(
                    getRadioActualTime(event.target.getDuration())
                  );
                  registerMethod("play", () => {
                    if (event.target) {
                      event.target.seekTo(
                        getRadioActualTime(event.target.getDuration())
                      );
                      event.target.playVideo();
                    }
                  });
                },
              },
            });
          };
        };
        document.body.appendChild(script);
      } else {
        await loadVideoAsync(videoId);
        player.seekTo(
          getRadioActualTime(player.getDuration())
        )
      }
    };

    initializePlayer();
  }, [videoId]);

  return <div ref={playerRef}></div>;
}
