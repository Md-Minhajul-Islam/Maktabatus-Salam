import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/user/Home";
import Notice from "./pages/user/Notice";
import Event from "./pages/user/Event";
import About from "./pages/user/About";
import Library from "./pages/user/Library";
import Login from "./pages/user/Login";

import Dashboard from "./pages/admin/Dashboard";
import AdminQuran from "./pages/admin/Quran";
import AdminBlog from "./pages/admin/Blog";
import AdminNotice from "./pages/admin/Notice";
import AdminEvent from "./pages/admin/Event";
import AdminLibrary from "./pages/admin/Library";
import AdminAbout from "./pages/admin/About";
import Quran from "./pages/admin/Quran";
import Blog from "./pages/admin/Blog";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            {/* User Section */}
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Section */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/quran" element={<AdminQuran />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/notice" element={<AdminNotice />} />
            <Route path="/admin/event" element={<AdminEvent />} />
            <Route path="/admin/library" element={<AdminLibrary />} />
            <Route path="/admin/about" element={<AdminLibrary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
