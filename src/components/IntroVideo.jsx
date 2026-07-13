import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { profile } from "../data/profile.js";

const SEEN_KEY = "as-intro-seen";

export default function IntroVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let alreadySeen = false;
    try {
      alreadySeen = window.localStorage.getItem(SEEN_KEY) === "true";
    } catch {
      alreadySeen = false;
    }

    if (!alreadySeen) {
      // Browsers only allow unattended autoplay when muted — start muted,
      // let the person unmute with one tap via the control below.
      video.muted = true;
      const playPromise = video.play();
      if (playPromise?.then) {
        playPromise
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
      try {
        window.localStorage.setItem(SEEN_KEY, "true");
      } catch {
        /* private-browsing localStorage can throw — safe to ignore */
      }
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-black shadow-glass dark:border-white/10"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src={profile.introVideo}
        playsInline
        loop
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) =>
          setProgress(
            (e.currentTarget.currentTime / (e.currentTarget.duration || 1)) *
              100
          )
        }
        onClick={togglePlay}
        className="aspect-video w-full cursor-pointer object-cover"
      />

      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Play intro video"
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-lg transition-transform hover:scale-105">
            <Play size={26} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}

      <div
        className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300 ${
          hovering || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          {playing ? (
            <Pause size={15} fill="currentColor" />
          ) : (
            <Play size={15} fill="currentColor" className="ml-0.5" />
          )}
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-aqua-400 to-neon-violet"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  );
}
