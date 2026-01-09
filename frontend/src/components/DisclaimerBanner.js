import { useState, useEffect } from "react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("hideDisclaimer");
    if (stored === "true") setVisible(false);
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem("hideDisclaimer", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[rgb(20,79,20)] text-[#e0ede0] text-sm flex justify-between items-center px-6 py-3 z-50 shadow-md">
      <p>
        💚 MatchaAI is a space to relax and vent — not a substitute for therapy or medical care.
        If you're in crisis, visit the <a href="/resources" className="underline">Resources</a> page.
      </p>
      <button
        onClick={dismiss}
        className="ml-4 text-white bg-[rgba(255,255,255,0.2)] px-3 py-1 rounded hover:bg-[rgba(255,255,255,0.3)]"
      >
        Got it
      </button>
    </div>
  );
}