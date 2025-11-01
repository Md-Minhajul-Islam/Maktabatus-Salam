import { useEffect, useState } from "react";
import axios from "axios";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import ConfirmDialog from "../../utils/ConfirmDialog";
import TextCard from "../../components/TextCard";
import EditModal from "../../components/EditModal";
import AddPostIcon from "/images/add-post-icon.png";
import API_BASE_URL from "../../config";

const Blog = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await axios.get(`${API_BASE_URL}/blog`);
        setBlogs(blogsRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <div>
        <AdminMenu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );

  if (!loggedIn)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-lg font-bold text-center m-5">
          Unauthorized!
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div>
      <AdminMenu />
      <div className="md:flex md:flex-col">
        <section className="p-1.5">
          <button
            onClick={() => {
              onEdit({});
            }}
            className="text-green-700 right-2 absolute font-bold md:right-1/8 md:hover:cursor-pointer"
          >
            <img className="w-5" src={AddPostIcon} alt="Add+" />
          </button>
          <br />
        </section>

        {/* Blog Section */}
        <section className="h-screen md:w-3/4 md:mx-auto">
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
    </div>
  );
};

export default Blog;
