import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("musicMuted");
    return saved ? JSON.parse(saved) : false;
  });

  const [bgMusic, setBgMusic] = useState(null);

  // 🎶 Initialize the looping background music
  useEffect(() => {
    const music = new Howl({
      src: ["/sounds/lofi-cafe.mp3"],
      loop: true,
      volume: 0.4,
    });
    setBgMusic(music);

    // Browsers block autoplay → wait for first click
    const startMusic = () => {
      if (!isMuted && !music.playing()) music.play();
      document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);

    return () => {
      music.stop();
      document.removeEventListener("click", startMusic);
    };
  }, []);

  // 🎚️ Smooth fade transition when toggling mute/unmute
  useEffect(() => {
    if (!bgMusic) return;

    if (isMuted) {
      // fade volume down to 0 over 1 second
      bgMusic.fade(bgMusic.volume(), 0, 1000);
      setTimeout(() => bgMusic.pause(), 1000);
    } else {
      // resume and fade back in to 0.4 volume
      bgMusic.play();
      bgMusic.fade(0, 0.4, 1200);
    }

    Howler.mute(false); // ensure global mute not blocking fades
    localStorage.setItem("musicMuted", JSON.stringify(isMuted));
  }, [isMuted, bgMusic]);

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      className="fixed bottom-8 left-8 bg-[rgb(20,79,20)] text-[#e0ede0] px-4 py-2 rounded-full shadow-md hover:opacity-90 transition-transform active:scale-95 z-50"
    >
      {isMuted ? "🔇 Music Off" : "🎵 Music On"}
    </button>
  );
}