import { useState, useEffect } from "react";

export default function StressClicker() {
    const [count, setCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [muted, setMuted] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [clicked, setClicked] = useState(false);

    // Load leaderboard from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("matchaLeaderboard")) || [];
        setLeaderboard(saved);
    }, []);

    // Timer countdown
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0 && isRunning) {
        endGame();
        }
        return () => clearTimeout(timer);
    }, [isRunning, timeLeft]);

    // Start game — prompt for name
    const startGame = () => {
        const name = prompt("Enter your name (or leave blank for Anonymous):");
        setPlayerName(name?.trim() || "Anonymous");
        setCount(0);
        setTimeLeft(60);
        setIsRunning(true);
    };

    // End game + save to leaderboard
    const endGame = () => {
        setIsRunning(false);
        const newEntry = { name: playerName, score: count };
        const updated = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

        setLeaderboard(updated);
        localStorage.setItem("matchaLeaderboard", JSON.stringify(updated));
    };

    // Click handler + pulse animation
    const handleClick = () => {
        if (!isRunning) return;
        const pop = new Audio("/sounds/pop.mp3");
        if (!muted) pop.play();

        setCount((c) => c + 1);
        setClicked(true);
        setTimeout(() => setClicked(false), 150);
    };

    const medal = (index) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return "🍵";
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-40 mt-6 min-h-screen bg-[#e0ede0] text-[rgb(20,79,20)]">
            <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2">🍵 Matcha Clicker</h1>
            <p className="mb-6">Click as many times as you can in 60 seconds!</p>

            <div className="flex gap-8 ">
                <p className="text-xl font-semibold">Time: {timeLeft}s</p>
                <p className="text-xl font-semibold">Score: {count}</p>
            </div>

            <img
            src={process.env.PUBLIC_URL + "/images/matcha.png"}
            alt="matcha"
            className={`h-[420px] cursor-pointer transition-transform duration-200 ease-out ${
                clicked ? "scale-125" : "scale-100"
            } ${isRunning ? "hover:scale-125" : "opacity-70"}`}
            onClick={handleClick}
            />


            <div className="flex gap-4">
                {!isRunning ? (
                <button
                    onClick={startGame}
                    className="bg-[rgb(20,79,20)] text-[#e0ede0] px-6 py-2 rounded-xl hover:opacity-90"
                >
                    Start Game
                </button>
                ) : (
                <button
                    onClick={endGame}
                    className="bg-red-600 text-white px-6 py-2 rounded-xl hover:opacity-90"
                >
                    End Game
                </button>
                )}

                <button
                onClick={() => setMuted(!muted)}
                className="bg-[rgb(20,79,20)] text-[#e0ede0] px-4 py-2 rounded-xl hover:opacity-90"
                >
                {muted ? "🔇 Unmute" : "🔊 Mute Pop"}
                </button>
            </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-6 w-[320px] border border-[#b9e4c9] md:mt-0 mt-10">
                <h2 className="text-xl font-bold mb-4 text-center text-[rgb(20,79,20)]">
                🏆 Matcha Masters 🏆
                </h2>
                {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500">No scores yet!</p>
                ) : (
                <ul className="space-y-2">
                    {leaderboard.map((entry, idx) => (
                    <li
                        key={idx}
                        className={`flex justify-between items-center border-b border-gray-200 pb-1 rounded-lg px-2 py-1 ${
                        idx === 0
                            ? "bg-[#b9e4c9] shadow-[0_0_10px_#a2d2a2]"
                            : idx === 1
                            ? "bg-[#cdeed4]"
                            : idx === 2
                            ? "bg-[#dff6df]"
                            : "bg-white"
                        }`}
                    >
                        <span className="text-lg">
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "🍵"}{" "}
                        {entry.name}
                        </span>
                        <span className="font-bold text-[rgb(20,79,20)]">{entry.score}</span>
                    </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    );
}