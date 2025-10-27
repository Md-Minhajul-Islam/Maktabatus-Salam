import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Quran from "./pages/Quran";
import Notice from "./pages/Notice";
import Event from "./pages/Event";
import About from "./pages/About";
import Library from "./pages/Library";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
