import { useState, useEffect } from "react";
import { Howl } from "howler";

const popSound = new Howl({
  src: ["/sounds/pop.mp3"],
  volume: 0.5,
});

export default function StressClicker() {
    const [count, setCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [leaderboard, setLeaderboard] = useState(() => {
        const saved = localStorage.getItem("matchaLeaderboard");
        return saved ? JSON.parse(saved) : [];
    });

    // countdown timer
    useEffect(() => {
        if (!isPlaying || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    // end of game
    useEffect(() => {
        if (timeLeft === 0 && isPlaying) {
        setIsPlaying(false);
        saveScore(count);
        }
    }, [timeLeft]);

    const startGame = () => {
        setCount(0);
        setTimeLeft(60);
        setIsPlaying(true);
    };

    const handleClick = () => {
    if (isPlaying) {
        popSound.play();  // 🫧 plays pop sound
        setCount((c) => c + 1);
    }
    };


    const saveScore = (score) => {
        const name = prompt("Nice job! Enter your name for the leaderboard:") || "Anonymous";
        const newBoard = [...leaderboard, { name, score, date: new Date().toLocaleString() }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5); // keep top 5
        setLeaderboard(newBoard);
        localStorage.setItem("matchaLeaderboard", JSON.stringify(newBoard));
    };

    return (
        <div className="flex flex-col items-center text-center mt-12 space-y-4">
        <h2 className="text-2xl font-bold text-green-900">☕ Smash Your Stress</h2>
        <p className="text-green-700">
            {isPlaying
            ? `Time Left: ${timeLeft}s`
            : "Click the matcha as fast as you can for 1 minute!"}
        </p>

        <img
            src="/images/matcha.png"
            alt="matcha"
            onClick={handleClick}
            className={`w-48 h-48 object-contain cursor-pointer transition-transform ${
            isPlaying ? "active:scale-90" : "opacity-60 cursor-not-allowed"
            }`}
        />

        <p className="text-green-800 text-lg font-semibold">Score: {count}</p>

        {!isPlaying && (
            <button
            onClick={startGame}
            className="bg-green-700 text-white px-6 py-2 rounded-2xl font-semibold hover:bg-green-800 transition"
            >
            {timeLeft === 0 ? "Play Again" : "Start Game"}
            </button>
        )}

        {/* Leaderboard */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4 w-64">
            <h3 className="font-bold text-green-800 mb-2">🏆 Leaderboard</h3>
            {leaderboard.length === 0 ? (
            <p className="text-sm text-green-600">No scores yet. Be the first!</p>
            ) : (
            <ul className="space-y-1">
                {leaderboard.map((entry, i) => (
                <li key={i} className="text-green-700 text-sm">
                    {i + 1}. {entry.name} — <b>{entry.score}</b> clicks
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
}