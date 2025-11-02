import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const formRef = useRef();
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("sending...");

        emailjs
        .sendForm(
            "service_ydd9zqn", // 🔹 your Gmail service ID from EmailJS
            "template_ol0ztbv",  // 🔹 your template ID from EmailJS
            formRef.current,
            "nd1cZapPt2H0JzNf0"    // 🔹 your public key from EmailJS
        )
        .then(
            () => {
            setStatus("Message sent successfully 💚");
            e.target.reset();
            },
            (error) => {
            console.error("FAILED...", error.text);
            setStatus("Oops! Something went wrong.");
            }
        );
    };

    return (
        <section className="max-w-2xl mx-auto mt-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-[rgb(20,79,20)]">
            Contact Us
        </h2>
        <p className="mb-6 text-[rgb(20,79,20)]">
            We'd love to hear from you! Whether you have questions, feedback, or
            just need someone to reach out, send us a note below 💌
        </p>

        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md"
        >
            <input type="hidden" name="to_email" value="aminjuveria00@gmail.com"/>
            <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="border border-[rgb(20,79,20)] p-3 rounded-lg focus:outline-none"
            />
            <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="border border-[rgb(20,79,20)] p-3 rounded-lg focus:outline-none"
            />
            <textarea
            name="message"
            placeholder="Your Message"
            required
            rows="5"
            className="border border-[rgb(20,79,20)] p-3 rounded-lg focus:outline-none"
            ></textarea>
            <button
            type="submit"
            className="bg-[rgb(20,79,20)] text-[#e0ede0] py-3 px-6 rounded-lg hover:opacity-90 font-semibold"
            >
            Send Message
            </button>
        </form>

        {status && (
            <p className="mt-4 text-[rgb(20,79,20)] font-medium">{status}</p>
        )}
        </section>
    );
}