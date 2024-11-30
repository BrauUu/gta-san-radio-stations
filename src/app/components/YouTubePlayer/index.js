import { useEffect, useState } from "react";

export default function YouTubePlayer ({ videoId }) {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = () => {
        window.onYouTubeIframeAPIReady = () => {
          console.log(videoId, 'emcima')
          new window.YT.Player('youtube-player', {
            height: "315",
            width: "560",
            videoId: videoId,
            events: {
              onReady: (event) => {
                setPlayer(event.target);
              },
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
      <div id="youtube-player">
      </div>
  );
};