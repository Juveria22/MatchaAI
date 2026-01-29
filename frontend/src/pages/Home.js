import { useState, useRef, useEffect } from "react";

const API_URL = "https://matchaibackend.onrender.com";
const session_id = "user_" + Math.floor(Math.random() * 10000);

export default function Home() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typingText, setTypingText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const chatBodyRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setChatOpen(!chatOpen);

    const appendMessage = (role, text) => {
        setMessages((prev) => [...prev, { role, text }]);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;
        appendMessage("You", input);
        const userText = input;
        setInput("");

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id, query: userText }),
            });
            const data = await res.json();
            const botResponse = data.response || "No response received.";

            setIsTyping(true);
            setTypingText("");
            let i = 0;
            const interval = setInterval(() => {
                setTypingText((prev) => prev + botResponse.charAt(i));
                i++;
                if (i >= botResponse.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                    appendMessage("Bot", botResponse);
                }
            }, 25);
        } catch (err) {
            appendMessage("Bot", "Oops! Something went wrong.");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const [isVideoPaused, setIsVideoPaused] = useState(false);

    const toggleVideoPlayback = () => {
        if (videoRef.current) {
            if (isVideoPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsVideoPaused(!isVideoPaused);
        }
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, rgba(84, 126, 64, 1), rgba(39, 70, 25, 1), rgba(19, 44, 9, 1))' }}>
            
            {/* Main Content */}
            <div className="relative">
                {/* Hero Section with Video */}
                <section className="min-h-screen flex items-center justify-center px-4 py-16">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            
                            {/* Left Side - Text Content */}
                            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                                {/* Floating Badge */}
                                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full border border-[#4d8c57]/30 text-[#d4dbb8] text-sm font-medium">
                                    <span className="w-2 h-2 bg-[#9db370] rounded-full animate-pulse"></span>
                                    AI-Powered Mental Wellness
                                </div>

                                {/* Main Headline */}
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                                    Your Mental Health
                                    <span className="block bg-gradient-to-r from-[#9db370] via-[#b8c990] to-[#cbd6a8] bg-clip-text text-transparent">
                                        Companion
                                    </span>
                                </h1>

                                {/* Subheadline */}
                                <p className="text-lg md:text-xl text-[#d4dbb8] max-w-xl leading-relaxed font-light">
                                    Like sipping an ice-cold matcha latte, we're here to help you feel 
                                    <span className="font-semibold text-white"> calm, recharged, and supported</span>
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
                                    <button 
                                        onClick={toggleChat}
                                        className="group px-8 py-4 bg-[#9db370] text-[#3d4a2c] rounded-full font-bold text-lg shadow-2xl hover:shadow-[#9db370]/50 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                                    >
                                        Start Chatting
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                    <button className="px-8 py-4 bg-[#6b7c4e]/40 backdrop-blur-md text-white rounded-full font-semibold text-lg border-2 border-[#4d8c57]/50 hover:bg-[#6b7c4e]/60 hover:scale-105 transition-all duration-300">
                                        Learn More
                                    </button>
                                </div>

                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                                    {['24/7 Support', 'Private & Secure', 'AI-Powered', 'Always Free'].map((feature) => (
                                        <span key={feature} className="px-5 py-2 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full text-[#d4dbb8] text-sm border border-[#4d8c57]/30">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side - Vertical Video */}
                            <div className="order-1 lg:order-2 flex justify-center">
                                <div className="relative">
                                    {/* Video Container*/}
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#9db370]/30 w-[360px] md:w-[480px] lg:w-[550px] h-[640px] md:h-[850px] lg:h-[980px]">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-full object-cover"
                                            onError={(e) => console.error("Video failed to load:", e)}
                                        >
                                            <source src="/videos/matcha-background.mp4" type="video/webm" />
                                            <source src="/videos/matcha-backgroun1.webm" type="video/webm" />
                                        </video>
                                        
                                        {/* Subtle gradient overlay video */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(50,94,39,0.4)] via-transparent to-transparent pointer-events-none"></div>
                                        
                                        {/* Play/Pause Button */}
                                        <button
                                            onClick={toggleVideoPlayback}
                                            className="absolute bottom-6 right-6 w-14 h-14 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-all duration-300 group"
                                        >
                                            {isVideoPaused ? (
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    {/* glow around video */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-[#9db370]/20 via-[#b8c990]/20 to-[#9db370]/20 blur-2xl -z-10 rounded-3xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Meet Your Companion
                        </h2>
                        <p className="text-xl text-[#d4dbb8] max-w-2xl mx-auto mb-12">
                            A safe space to share your thoughts, feelings, and concerns
                        </p>

                        {/* Matcha Char */}
                        <div className="animate-float">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-[#9db370]/20 blur-3xl rounded-full"></div>
                                <img
                                    src="/images/matcha_smiling.png"
                                    alt="Matcha mascot"
                                    className="relative rounded-3xl shadow-2xl shadow-[#3d4a2c]/50 w-72 md:w-96 transition-transform duration-500 hover:scale-110 hover:rotate-3"
                                />
                            </div>
                        </div>

                        {/* TikTok */}
                        <div className="pt-12">
                            <a 
                                href="https://www.tiktok.com/@vivismatcha" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full border border-[#4d8c57]/30 text-white hover:bg-[#6b7c4e]/60 hover:scale-105 transition-all duration-300 group"
                            >
                                <svg 
                                    className="w-6 h-6 group-hover:animate-bounce" 
                                    fill="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                                <span className="font-semibold">Follow on TikTok</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Other Social Links */}
                <footer className="relative pb-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#4d8c57]/30 to-transparent mb-8"></div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-[#d4dbb8]/60 text-sm">
                                © 2026 MatchaAI. Made with ♥ for mental wellness.
                            </p>
                            <div className="flex items-center gap-4">
                                <a 
                                    href="https://www.tiktok.com/@yourusername" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#6b7c4e]/60 hover:scale-110 transition-all duration-300"
                                    aria-label="TikTok"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://github.com/yourusername" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#6b7c4e]/60 hover:scale-110 transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://linkedin.com/in/yourusername" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-[#6b7c4e]/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#6b7c4e]/60 hover:scale-110 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Floating Chat Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-[#8ba968] to-[#6d8a4f] rounded-full shadow-2xl shadow-[#8ba968]/30 flex items-center justify-center hover:scale-110 transition-all duration-300 group z-50"
            >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                <img 
                    src="/images/chat.png" 
                    alt="chat" 
                    className="w-10 h-10 relative z-10 group-hover:rotate-12 transition-transform" 
                />
            </button>

            {/* Modern Chat Widget */}
            {chatOpen && (
                <div 
                    className="fixed bottom-32 right-8 w-[440px] h-[600px] bg-[#2a3621]/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#8ba968]/30 z-50"
                >
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-[#8ba968] to-[#6d8a4f] p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🍵</span>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">MatchaAI</h3>
                                <p className="text-[#d4dbb8] text-xs">Here for you 24/7</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div
                        ref={chatBodyRef}
                        className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-[#3d4f2f] to-[#2a3621]"
                    >
                        {messages.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-[#d4dbb8] text-sm">Start a conversation...</p>
                            </div>
                        )}
                        
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${m.role === "You" ? "justify-end" : "justify-start"} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md ${
                                        m.role === "You"
                                            ? "bg-gradient-to-br from-[#8ba968] to-[#6d8a4f] text-white rounded-br-sm"
                                            : "bg-[#4a5c3a] text-white rounded-bl-sm border border-[#8ba968]/30"
                                    }`}
                                >
                                    {m.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-fadeIn">
                                <div className="max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-sm shadow-md bg-[#4a5c3a] text-white border border-[#8ba968]/30">
                                    {typingText}
                                    <span className="inline-block w-1 h-4 bg-[#8ba968] ml-1 animate-pulse"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-[#2a3621] border-t border-[#8ba968]/30">
                        <div className="flex gap-3 items-center bg-[#4a5c3a]/50 rounded-2xl px-4 py-2 border border-[#8ba968]/30 focus-within:border-[#8ba968] focus-within:ring-2 focus-within:ring-[#8ba968]/30 transition-all">
                            <input
                                type="text"
                                className="flex-1 bg-transparent text-white placeholder-[#d4dbb8]/50 focus:outline-none py-2"
                                placeholder="Spill the tea..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-gradient-to-r from-[#8ba968] to-[#6d8a4f] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}