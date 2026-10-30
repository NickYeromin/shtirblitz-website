"use client";

import { useEffect, useRef } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;

    const removeListeners = () => {
      document.removeEventListener("click", startPlayback);
      document.removeEventListener("keydown", startPlayback);
    };

    const startPlayback = () => {
      // Autoplay may require a user gesture; keep listening until playback starts.
      void audio.play().catch(() => {});
    };

    audio.addEventListener("playing", removeListeners);
    document.addEventListener("click", startPlayback);
    document.addEventListener("keydown", startPlayback);
    startPlayback();

    return () => {
      removeListeners();
      audio.removeEventListener("playing", removeListeners);
      audio.pause();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/images/audio/bg-loop.mp3"
      loop
      preload="auto"
      aria-hidden="true"
    />
  );
}
