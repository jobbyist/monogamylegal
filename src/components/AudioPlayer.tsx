import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
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
  description: ReactNode;
  publishDate: string;
  duration: string; // e.g. "28:14"
  audioUrl?: string;
  thumbnailUrl?: string;
  isPreview?: boolean;
  isFeatured?: boolean;
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

  const descriptionText = typeof episode.description === "string" ? episode.description : "";

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
            <h3 className={`font-semibold leading-[1.3] mb-2 ${compact ? "text-[1.5rem]" : "text-[1.6rem]"} line-clamp-2`}>
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
              {episode.isFeatured && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[1.1rem] font-semibold uppercase tracking-[0.08em] text-primary">
                    Featured Badge
                  </span>
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
            <div className={`text-[1.3rem] text-muted-foreground leading-[1.6] whitespace-pre-line ${isExpanded ? "" : "line-clamp-4"}`}>
              {episode.description}
            </div>
            {descriptionText.length > 180 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[1.2rem] text-primary mt-1 hover:underline"
              >
                {isExpanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}

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

        <div className="flex items-center justify-between text-[1.1rem] text-muted-foreground mb-4">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 mb-4 flex-wrap">
          <button
            onClick={togglePlay}
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={handleRewind}
            className="h-9 w-9 rounded-full border border-border inline-flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Rewind 15 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleFastForward}
            className="h-9 w-9 rounded-full border border-border inline-flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Forward 15 seconds"
          >
            <FastForward className="w-4 h-4" />
          </button>

          <button
            onClick={cycleSpeed}
            className="h-9 px-3 rounded-full border border-border inline-flex items-center justify-center hover:bg-muted transition-colors text-[1.2rem]"
            aria-label="Change playback speed"
          >
            <Gauge className="w-4 h-4 mr-1" />
            {speed}x
          </button>

          <div className="flex items-center gap-2 ml-auto min-w-[140px]">
            <button
              onClick={toggleMute}
              className="h-8 w-8 rounded-full inline-flex items-center justify-center hover:bg-muted transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-primary"
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[1.15rem] text-muted-foreground">
          <span>
            {playCount} {playCount === 1 ? "play" : "plays"}
          </span>
          {pwaInstalled ? (
            <button
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              onClick={() => {
                if (episode.audioUrl) window.open(episode.audioUrl, "_blank", "noopener,noreferrer");
              }}
              disabled={!episode.audioUrl}
              title={episode.audioUrl ? "Download audio" : "Audio unavailable"}
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          ) : (
            <span className="opacity-70">Install app to download</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
