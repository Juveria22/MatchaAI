export default function Resources() {
    return (
        <div className="min-h-screen bg-[#e0ede0] text-[rgb(20,79,20)] flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6">💚 Mental Health & Crisis Resources</h1>

        <p className="max-w-2xl text-center mb-8">
            MatchaAI is a safe, comforting space to vent and recenter — 
            but it's not a substitute for therapy or professional mental health care.  
            If you're in crisis or need immediate help, please reach out to a trusted source below.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
            {/* CRISIS HOTLINES */}
            <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">🚨 Emergency & Crisis Lines</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>
                <strong>911 (U.S.)</strong> — For any life-threatening emergency.
                </li>
                <li>
                <strong>988 Suicide & Crisis Lifeline (U.S.)</strong> — Call or text{" "}
                <a
                    href="https://988lifeline.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    988lifeline.org
                </a>
                </li>
                <li>
                <strong>Crisis Text Line</strong> — Text <em>HOME</em> to{" "}
                <strong>741741</strong> (free 24/7 support).
                </li>
                <li>
                <strong>Veterans Crisis Line</strong> — Call <strong>988</strong> then press 1.
                </li>
                <li>
                <strong>Trans Lifeline</strong> —{" "}
                <a
                    href="https://translifeline.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    translifeline.org
                </a>{" "}
                | Call <strong>877-565-8860</strong>
                </li>
            </ul>
            </div>

            {/* PROFESSIONAL HELP */}
            <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">🧠 Professional Support</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>
                <a
                    href="https://www.betterhelp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    BetterHelp
                </a>{" "}
                — Affordable online therapy and licensed therapists.
                </li>
                <li>
                <a
                    href="https://www.talkspace.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Talkspace
                </a>{" "}
                — Therapy and psychiatry available through chat or video.
                </li>
                <li>
                <a
                    href="https://findahelpline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Find a Helpline
                </a>{" "}
                — Global directory of mental health hotlines.
                </li>
                <li>
                <a
                    href="https://openpathcollective.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Open Path Collective
                </a>{" "}
                — Affordable in-person or virtual therapy sessions.
                </li>
            </ul>
            </div>

            {/* SELF-HELP TOOLS */}
            <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-3">🌿 Self-Care & Mental Wellness Tools</h2>
            <ul className="list-disc list-inside space-y-2">
                <li>
                <a
                    href="https://www.headspace.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Headspace
                </a>{" "}
                — Meditation and mindfulness made simple.
                </li>
                <li>
                <a
                    href="https://www.calm.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Calm
                </a>{" "}
                — Sleep, meditation, and relaxation.
                </li>
            </ul>
            </div>
        </div>

        <p className="mt-10 max-w-xl text-center text-sm opacity-80">
            💬 MatchaAI is here to help you pause, breathe, and process your emotions.
            But please, reach out for professional support when you need it.
        </p>
        </div>
    );
}
