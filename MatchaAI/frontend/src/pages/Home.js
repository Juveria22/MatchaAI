import { useState, useRef, useEffect } from "react";

const API_URL = "https://matchaibackend.onrender.com"; // Update after deployment
const session_id = "user_" + Math.floor(Math.random() * 10000);

export default function Home() {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const chatBodyRef = useRef(null);

    // Auto-scroll to latest message
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
        appendMessage("Bot", data.response || "No response received.");
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

    return (
        <div className="font-sans text-[rgb(20,79,20)] bg-[#e0ede0] min-h-screen flex flex-col items-center">
        <section className="max-w-3xl mx-auto mt-16 text-center px-4">
            <h2 className="text-2xl font-bold mb-4">
            Your friendly neighborhood support bot
            </h2>
            <p className="text-[rgb(20,79,20)] leading-relaxed">
            MatchaAI is here to give you emotional support, encouragement or just
            be a listening ear. Like sipping an ice-cold matcha latte or a warm
            chai, we want you to feel calm and recharged. Feeling overwhelmed,
            stressed, or just need to vent? Text us anytime 💬
            </p>

            <div className="flex justify-center mt-6">
            <img
                    src="/images/matcha_smiling.png"
                    alt="matcha"
                    className="rounded-2xl max-w-full h-auto shadow-xl w-[320px] md:w-[360px] transition-transform duration-300 ease-in-out hover:scale-105"
            />
            </div>
        </section>

        {/* Floating Chat Icon */}
        <div
            onClick={toggleChat}
            className="fixed bottom-8 right-8 bg-[rgb(20,79,20)] text-[#e0ede0] w-[60px] h-[60px] rounded-full flex justify-center items-center cursor-pointer shadow-md"
        >
            <img src="/images/chat.png" alt="chat icon" className="w-[40px] h-[40px]" />
        </div>

        {/* Chat Widget */}
        {chatOpen && (
            <div className="fixed bottom-28 right-8 w-[400px] h-[500px] bg-[#e0ede0] rounded-xl shadow-2xl flex flex-col z-50 chat-widget">
            <div className="bg-[rgb(20,79,20)] text-[#e0ede0] p-4 font-bold flex justify-between items-center">
                MatchaAI is here for you 💚
                <span
                className="cursor-pointer text-lg font-normal hover:opacity-70"
                onClick={toggleChat}
                >
                ×
                </span>
            </div>

            <div
                ref={chatBodyRef}
                className="flex-1 p-4 bg-white overflow-y-auto space-y-2"
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex ${
                        m.role === "You" ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                            m.role === "You"
                            ? "bg-[#b9e4c9] text-[rgb(20,79,20)] self-end"
                            : "bg-[rgb(20,79,20)] text-[#e0ede0] self-start"
                        }`}
                        >
                        {m.text}
                        </div>
                    </div>
                ))}

            </div>

            <div className="flex border-t border-[#e0ede0]">
                <input
                type="text"
                className="flex-1 p-3 text-[rgb(20,79,20)] border-none focus:outline-none"
                placeholder="Spill the tea..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                />
                <button
                onClick={sendMessage}
                className="bg-[rgb(20,79,20)] text-[#e0ede0] px-6 hover:opacity-90"
                >
                Send
                </button>
            </div>
            </div>
        )}
        </div>
    );
}
