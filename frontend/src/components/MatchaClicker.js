import { useState, useEffect } from "react";

export default function MatchaClicker() {
  const [count, setCount] = useState(() => {
    // Load saved progress
    const saved = localStorage.getItem("matchaClicks");
    return saved ? JSON.parse(saved) : 0;
  });

  const [multiplier, setMultiplier] = useState(() => {
    const saved = localStorage.getItem("matchaMultiplier");
    return saved ? JSON.parse(saved) : 1;
  });

  useEffect(() => {
    // Save progress whenever count or multiplier changes
    localStorage.setItem("matchaClicks", JSON.stringify(count));
    localStorage.setItem("matchaMultiplier", JSON.stringify(multiplier));
  }, [count, multiplier]);

  const handleClick = () => {
    setCount(count + 1 * multiplier);
  };

  const buyUpgrade = () => {
    if (count >= 50) {
      setCount(count - 50);
      setMultiplier(multiplier + 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-center mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-green-900">☕ Matcha Clicker</h2>
      <p className="text-green-800">Clicks: {count}</p>
      <img
        src="/matcha.PNG"
        alt="Matcha"
        onClick={handleClick}
        className="w-48 h-48 object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
      />
      <button
        onClick={buyUpgrade}
        disabled={count < 50}
        className={`px-4 py-2 rounded-2xl font-semibold ${
          count >= 50
            ? "bg-green-700 text-white hover:bg-green-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Buy Whisk Upgrade (50 clicks)
      </button>
      <p className="text-sm text-green-700">
        Current Multiplier: {multiplier}x
      </p>
    </div>
  );
}