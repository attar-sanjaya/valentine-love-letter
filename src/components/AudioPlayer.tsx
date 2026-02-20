import { useEffect, useRef, useCallback } from "react";

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AudioPlayer = ({ isPlaying, isMuted }: AudioPlayerProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReadyRef = useRef(false);

  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;

    playerRef.current = new (window as any).YT.Player("yt-player", {
      videoId: "FRRA1X_I5IE",
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: "FRRA1X_I5IE",
      },
      events: {
        onReady: () => {
          isReadyRef.current = true;
          if (playerRef.current) {
            playerRef.current.setVolume(isMuted ? 0 : 50);
            if (isPlaying) {
              playerRef.current.playVideo();
            }
          }
        },
      },
    });
  }, [isPlaying, isMuted]);

  // Load YouTube IFrame API
  useEffect(() => {
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      initPlayer();
    };

    return () => {
      (window as any).onYouTubeIframeAPIReady = undefined;
    };
  }, [initPlayer]);

  // Handle play/pause
  useEffect(() => {
    if (!isReadyRef.current || !playerRef.current) return;
    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Handle mute/unmute
  useEffect(() => {
    if (!isReadyRef.current || !playerRef.current) return;
    playerRef.current.setVolume(isMuted ? 0 : 50);
  }, [isMuted]);

  return (
    <div className="fixed -top-[9999px] -left-[9999px] w-0 h-0 overflow-hidden pointer-events-none">
      <div ref={containerRef}>
        <div id="yt-player" />
      </div>
    </div>
  );
};

export default AudioPlayer;
