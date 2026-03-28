import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Volume2,
  VolumeX,
  Download,
  Heart,
  Gauge,
} from "lucide-react";

export interface AudioEpisode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: string; // e.g. "28:14"
  audioUrl?: string;
  thumbnailUrl?: string;
  isPreview?: boolean;
}

interface AudioPlayerProps {
  episode: AudioEpisode;
  compact?: boolean;
  requireLogin?: boolean;
  onLoginRequired?: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

function getPersistentKey(key: string) {
  return `monogamy_audio_${key}`;
}

function getStoredNumber(key: string, fallback: number): number {
  try {
    const v = localStorage.getItem(getPersistentKey(key));
    return v !== null ? Number(v) : fallback;
  } catch {
    return fallback;
  }
}

function setStoredNumber(key: string, value: number) {
  try {
    localStorage.setItem(getPersistentKey(key), String(value));
  } catch {
    // ignore
  }
}

function getStoredBool(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(getPersistentKey(key));
    return v !== null ? v === "true" : fallback;
  } catch {
    return fallback;
  }
}

function setStoredBool(key: string, value: boolean) {
  try {
    localStorage.setItem(getPersistentKey(key), String(value));
  } catch {
    // ignore
  }
}

function isPwaInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  episode,
  compact = false,
  requireLogin = false,
  onLoginRequired,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => getStoredNumber(`vol_${episode.id}`, 1));
  const [isMuted, setIsMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(() => {
    const stored = getStoredNumber(`speed_${episode.id}`, 1);
    return SPEEDS.indexOf(stored) !== -1 ? SPEEDS.indexOf(stored) : 1;
  });
  const [liked, setLiked] = useState(() => getStoredBool(`liked_${episode.id}`, false));
  const [likeCount, setLikeCount] = useState(() => getStoredNumber(`likes_${episode.id}`, 0));
  const [playCount, setPlayCount] = useState(() => getStoredNumber(`plays_${episode.id}`, 0));
  const [pwaInstalled] = useState(isPwaInstalled);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasCountedPlay = useRef(false);

  const speed = SPEEDS[speedIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = speed;
  }, [volume, isMuted, speed]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);

    // Count as played once past 10 seconds
    if (!hasCountedPlay.current && audio.currentTime > 10) {
      hasCountedPlay.current = true;
      const newCount = playCount + 1;
      setPlayCount(newCount);
      setStoredNumber(`plays_${episode.id}`, newCount);
    }
  }, [episode.id, playCount]);

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = speed;
  }, [isMuted, volume, speed]);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    hasCountedPlay.current = false;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  const togglePlay = async () => {
    if (requireLogin && onLoginRequired) {
      onLoginRequired();
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // audio may not be available
      }
    }
  };

  const handleRewind = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };

  const handleFastForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 15);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    setStoredNumber(`vol_${episode.id}`, val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) audioRef.current.volume = newMuted ? 0 : volume;
  };

  const cycleSpeed = () => {
    const next = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(next);
    setStoredNumber(`speed_${episode.id}`, SPEEDS[next]);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const toggleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : Math.max(0, likeCount - 1);
    setLiked(newLiked);
    setLikeCount(newCount);
    setStoredBool(`liked_${episode.id}`, newLiked);
    setStoredNumber(`likes_${episode.id}`, newCount);
  };

  const formatTime = (secs: number) => {
    if (!isFinite(secs) || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const thumbnail =
    episode.thumbnailUrl ||
    "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/uploads/1770788009856-MONOGAMY_LOGO_PACK_AND_MEDIA_ASSETS.png";

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {episode.audioUrl && (
        <audio ref={audioRef} src={episode.audioUrl} preload="metadata" />
      )}
      {!episode.audioUrl && (
        <audio ref={audioRef} preload="none" />
      )}

      <div className="p-5 md:p-6">
        {/* Header row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={thumbnail}
              alt={episode.title}
              className="w-14 h-14 rounded-lg object-cover border border-border"
            />
          </div>

          {/* Title & meta */}
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold leading-[1.3] mb-1 ${compact ? "text-[1.5rem]" : "text-[1.6rem]"} line-clamp-2`}>
              {episode.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.2rem] text-muted-foreground">
              <span>{episode.publishDate}</span>
              <span>·</span>
              <span>{episode.duration}</span>
              {episode.isPreview && (
                <>
                  <span>·</span>
                  <span className="text-primary font-medium">Preview</span>
                </>
              )}
            </div>
          </div>

          {/* Like button */}
          <button
            onClick={toggleLike}
            className="flex-shrink-0 flex items-center gap-1.5 text-[1.2rem] text-muted-foreground hover:text-primary transition-colors group"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart
              className={`w-5 h-5 transition-all ${liked ? "fill-primary text-primary scale-110" : "group-hover:text-primary"}`}
            />
            <span className={liked ? "text-primary font-medium" : ""}>{likeCount}</span>
          </button>
        </div>

        {/* Description (collapsible) */}
        {!compact && (
          <div className="mb-4">
            <p className={`text-[1.3rem] text-muted-foreground leading-[1.6] ${isExpanded ? "" : "line-clamp-2"}`}>
              {episode.description}
            </p>
            {episode.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[1.2rem] text-primary mt-1 hover:underline"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="w-full h-1.5 bg-muted rounded-full cursor-pointer mb-3 relative overflow-hidden group"
          role="slider"
          aria-label="Playback progress"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 group-hover:bg-primary/80"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between text-[1.1rem] text-muted-foreground mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{episode.duration}</span>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Left: playback controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRewind}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Rewind 15 seconds"
              title="−15s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={handleFastForward}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Fast forward 15 seconds"
              title="+15s"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>

          {/* Right: volume, speed, plays, download */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-primary cursor-pointer"
                aria-label="Volume"
              />
            </div>

            {/* Playback speed */}
            <button
              onClick={cycleSpeed}
              className="flex items-center gap-1 text-[1.2rem] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
              aria-label="Playback speed"
              title="Change speed"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>{speed}×</span>
            </button>

            {/* Play count */}
            <span className="text-[1.2rem] text-muted-foreground" title="Play count">
              {playCount} {playCount === 1 ? "play" : "plays"}
            </span>

            {/* Download — only when PWA is installed */}
            {pwaInstalled && episode.audioUrl && (
              <a
                href={episode.audioUrl}
                download
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Download episode"
                title="Download for offline listening"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
