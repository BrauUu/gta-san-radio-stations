import { useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function YouTubePlayer({ videoId }) {

  const playerRef = useRef(null);
  const currentRadioRef = useRef(null);

  const {
    registerMethod,
    callMethod,
    player,
    setPlayer,
    currentRadio,
    volume
  } = useContext(GlobalContext);

  const getRadioActualTime = () => {
    const currentRadioDuration = currentRadioRef.current.duration
    return Number.parseInt(Date.now() / 1000) % currentRadioDuration
  }

  const loadVideoAsync = async (videoId) => {
    if (player) {
      player.cueVideoById(videoId);

      await new Promise((resolve, reject) => {
        const onPlayerStateChange = (event) => {
          if (event.data === window.YT.PlayerState.CUED) {
            player.seekTo(
              getRadioActualTime()
            )
            resolve();
          }
          if (event.data === window.YT.PlayerState.ENDED) {
            player.seekTo(
              getRadioActualTime()
            )
            resolve()
          }
        };

        player.addEventListener("onStateChange", onPlayerStateChange);
      });
    }
  }; 

  useEffect(() => {
    if (player) {
      player.setVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    currentRadioRef.current = currentRadio;
  }, [currentRadio])

  useEffect(() => {
    const initializePlayer = async () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onload = () => {
          window.onYouTubeIframeAPIReady = async () => {
            new window.YT.Player(playerRef.current, {
              height: "0",
              width: "0",
              videoId: videoId,
              playerVars: {
                loop: 1,
                playlist: videoId,
              },
              events: {
                onReady: async (event) => {
                  setPlayer(event.target)
                  registerMethod("play", () => {
                    if (event.target) {
                      event.target.seekTo(
                        getRadioActualTime()
                      );
                      event.target.playVideo();
                    }
                  });
                  registerMethod("muteOrUnmute", () => {
                    if (event.target) {
                      if (event.target.isMuted()) {
                        event.target.unMute()
                        return
                      }
                      event.target.mute()
                    }
                  });
                },
                onStateChange : async (event) => {
                  if (event.data == 2) {
                    callMethod('play')
                  }
                }
              },
            });
          };
        };
        document.body.appendChild(script);
      } else {
        await loadVideoAsync(videoId);
      }
    };

    initializePlayer();
  }, [videoId]);

  return <div ref={playerRef}></div>;
}
