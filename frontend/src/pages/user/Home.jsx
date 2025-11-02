import { useEffect, useState } from "react";
import axios from "axios";

import Menu from "../../components/Menu";
import QuranCard from "../../components/QuranCard";
import TextCard from "../../components/TextCard";
import API_BASE_URL from "../../config";

const Home = () => {
  const [quran, setQuran] = useState([]);
  const [currentVerse, setCurrentVerse] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quranRes, blogsRes] = await Promise.all(
          [
            axios.get(`${API_BASE_URL}/quran`),
            axios.get(`${API_BASE_URL}/blog`),
          ],
          {
            withCredentials: true,
          }
        );
        setQuran(quranRes.data);
        setBlogs(blogsRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (quran.length == 0) return;
    const randomIndex = Math.floor(Math.random() * quran.length);
    setCurrentVerse(quran[randomIndex]);
  }, [quran]);

  if (loading)
    return (
      <div>
        <Menu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );
  if (error)
    return (
      <div>
        <Menu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div className="md:flex md:flex-col">
      <Menu />
      {/* Quran Section */}
      <section className="bg-gray-100 text-center p-2 pt-3 relative md:text-xl">
        <QuranCard data={currentVerse} />
      </section>

      {/* Blog Section */}
      <section className="h-screen md:w-3/4 md:mx-auto">
        {blogs.map((blog) => (
          <TextCard key={blog.blog_id} data={blog} name={"blog"} />
        ))}
      </section>
    </div>
  );
};

export default Home;
