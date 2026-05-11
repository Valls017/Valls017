import { useEffect, useRef, useState } from "react";

const SONG_SRC = "/Home (Extended Version) - Undertale.mp3";
const AUTHOR_URL = "https://www.youtube.com/@SiIvaGunner";

export default function MusicWidget() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audioRef.current = audio;

    audio.volume = 0.25;
    audio.loop = true;
    audio.muted = false;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const attemptAutoplay = async () => {
      try {
        await audio.play();
      } catch {
        // Fallback for browsers that block autoplay with sound.
        audio.muted = true;
        setIsMuted(true);
        try {
          await audio.play();
        } catch {
          setIsPlaying(false);
        }
      }
    };

    void attemptAutoplay();

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        return;
      }
    }

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    setIsExpanded(true);
  };

  return (
    <div className="fixed right-4 bottom-4 z-[10000] flex items-end gap-2 max-[768px]:right-3 max-[768px]:bottom-3">
      <div
        className={`origin-bottom-right overflow-hidden border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_94%,transparent)] text-[var(--fg)] backdrop-blur-md transition-all duration-300 ${
          isExpanded ? "max-w-[290px] p-2 opacity-100" : "max-w-0 p-0 opacity-0"
        }`}
      >
        <div className="flex items-start gap-2">
          <img src="/silvagunner.png" alt="SiIvaGunner avatar" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="[font-family:var(--font-mono)] text-[0.65rem] tracking-[0.08em] text-[var(--muted)] uppercase">
              Now Playing
            </p>
            <div className="song-marquee [font-family:var(--font-body)] text-xs leading-tight">
              <div className="song-marquee-track">
                <span>Home (Extended Version) - Undertale</span>
                <span aria-hidden="true">Home (Extended Version) - Undertale</span>
              </div>
            </div>
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noreferrer"
              className="[font-family:var(--font-mono)] text-[0.68rem] text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              @SilvaGunner
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-1 cursor-pointer border border-[var(--border)] px-1.5 py-0.5 [font-family:var(--font-mono)] text-[0.62rem] text-[var(--muted)] transition hover:text-[var(--fg)]"
            aria-label="Close music credits"
          >
            X
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          void toggleMute();
        }}
        className={`group js-control relative flex h-12 w-12 cursor-pointer items-center justify-center border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--bg)_95%,transparent)] backdrop-blur-md transition hover:-translate-y-px ${
          isMuted ? "music-tap-pulse" : ""
        }`}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        <span className="flex items-end gap-[2px]">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={`music-bar h-2 w-[3px] bg-[var(--fg)] ${
                isPlaying && !isMuted ? "opacity-100" : "opacity-35"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </span>
        {isMuted ? (
          <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 [font-family:var(--font-mono)] text-[0.58rem] uppercase text-[var(--muted)]">
            tap
          </span>
        ) : null}
      </button>
    </div>
  );
}
