import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ChatWidget from "./components/ChatWidget";
import Lifestyle from "./pages/Lifestyle";
import Companion from "./pages/Companion";
import Play from "./pages/Play";
import Resources from "./pages/Resources";
import { useTheme } from "./theme";

export default function App() {
  const { toggle, icon } = useTheme();

  return (
    <>
      <NavBar onToggleTheme={toggle} themeIcon={icon} />
      <Routes>
        <Route path="/" element={<Lifestyle />} />
        <Route path="/matchai" element={<Companion />} />
        <Route path="/play" element={<Play />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<Lifestyle />} />
      </Routes>
    </>
  );
}

export { ChatWidget };
