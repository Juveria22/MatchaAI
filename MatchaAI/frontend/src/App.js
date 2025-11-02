//npm start
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import StressClicker from "./pages/StressClicker";
import BackgroundMusic from "./components/BackgroundMusic";
import Resources from "./pages/Resources";
import About from "./pages/About";
import DisclaimerBanner from "./components/DisclaimerBanner";
import Contact from "./pages/Contact";
import "./App.css"; // make sure fade-in + typing CSS goes here

export default function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="bg-[rgb(20,79,20)] text-white flex justify-between items-center px-8 py-4">
        <div className="font-bold text-xl">🍵 MatchaAI</div>
        <ul className="flex gap-8">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/clicker" className="hover:underline">
              Matcha Clicker
            </Link>
          </li>
          <li>
            <Link to="/resources" className="hover:underline">
              Resources
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* ROUTES */}
      <div className="min-h-screen bg-[#e0ede0] text-[rgb(20,79,20)] relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clicker" element={<StressClicker />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <DisclaimerBanner />
        <BackgroundMusic />
      </div>
    </Router>
  );
}
