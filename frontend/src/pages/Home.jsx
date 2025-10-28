import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FaEllipsisH } from "react-icons/fa";

import ConfirmDialog from "../utils/ConfirmDialog";
import QuranCard from "../components/QuranCard";
import TextCard from "../components/TextCard";
import EditModal from "../components/EditModal";

import AddPostIcon from "/images/add-post-icon.png";
import CheckLoggedIn from "../utils/CheckLoggedIn";
import API_BASE_URL from "../config";

const Home = () => {
  const [quran, setQuran] = useState([]);
  const [currentVerse, setCurrentVerse] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLoggedIn = async () => {
      setLoggedIn(await CheckLoggedIn());
    };
    fetchLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quranRes, blogsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/quran`),
          axios.get(`${API_BASE_URL}/blog`),
        ]);
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

  const deleteBlog = async (blog_id) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/blog`, {
        data: { blog_id },
        withCredentials: true,
      });
      setBlogs((prev) => prev.filter((b) => b.blog_id !== blog_id));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const onEdit = (data) => {
    setShowEditModal(true);
    if (data && data.blog_id && data.blog_title && data.blog_description) {
      setEditData({
        id: data.blog_id,
        title: data.blog_title,
        description: data.blog_description,
      });
    } else setEditData({});
  };

  const editBlog = async (editData) => {
    try {
      let response;
      if (editData && editData.id && editData.title && editData.description) {
        response = await axios.put(
          `${API_BASE_URL}/blog`,
          {
            blog_id: editData.id,
            blog_title: editData.title,
            blog_description: editData.description,
          },
          { withCredentials: true }
        );
        setBlogs((prev) =>
          prev.map((b) => (b.blog_id === editData.id ? response.data.data : b))
        );
      } else if (editData && editData.title && editData.description) {
        response = await axios.post(
          `${API_BASE_URL}/blog`,
          {
            blog_title: editData.title,
            blog_description: editData.description,
          },
          { withCredentials: true }
        );
        setBlogs((prev) => [response.data.data, ...prev]);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setEditData(null);
    setShowEditModal(false);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-green-800 font-bold">
        Please wait...
      </p>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      {/* Quran Section */}
      <section className="bg-gray-100 text-center p-2 pt-3 relative">
        {loggedIn && (
          <div>
            <Link to="/quran">
              <FaEllipsisH className="text-gray-400 size-3 absolute right-3" />
            </Link>
            <br />
          </div>
        )}
        <QuranCard data={currentVerse} />
      </section>

      {loggedIn && (
        <section className="p-1.5">
          <button
            onClick={() => {
              onEdit({});
            }}
            className="text-green-700 right-2 absolute font-bold"
          >
            <img className="w-5" src={AddPostIcon} alt="Add+" />
          </button>
          <br />
        </section>
      )}

      {/* Blog Section */}
      <section className="h-screen">
        <EditModal
          isOpen={showEditModal}
          editData={editData}
          onEdit={editBlog}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
        {blogs.map((blog) => (
          <TextCard
            key={blog.blog_id}
            data={blog}
            name={"blog"}
            onDelete={deleteBlog}
            onEdit={onEdit}
            loggedIn={loggedIn}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
