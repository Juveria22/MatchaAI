export default function About() {
    return (
        <div className="min-h-screen bg-[#e0ede0] text-[rgb(20,79,20)] flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6">🌼 About MatchaAI</h1>

        <div className="max-w-3xl text-center leading-relaxed space-y-6">
            <p>
            MatchaAI is a small corner of calm on the internet a place to vent, relax,
            and recentre yourself in moments of stress.
            </p>

            <p>
            Whether you’re feeling overwhelmed, anxious, or just need to release some tension,
            MatchaAI combines gentle conversation, mini-games (more coming soon), and calming visuals to help you
            pause and reconnect with yourself.
            </p>

            <p>
            Think of it like taking a quiet moment over your favorite drink.
            Like taking a deep breath between the chaos of your day.
            </p>

            <div className="bg-white p-6 rounded-xl shadow-md text-sm text-gray-700 italic">
            ⚠️ <strong>Important:</strong> MatchaAI is not a replacement for therapy or
            professional mental health care.  
            If you are in crisis or need help, please visit our{" "}
            <a href="/resources" className="underline font-medium text-[rgb(20,79,20)]">
                Resources
            </a>{" "}
            page for support lines and professional guidance.
            </div>

            <p>
            Built with love by someone who believe that mental wellness should be gentle,
            accessible, and stigma-free.
            </p>
        </div>
        </div>
    );
}