import { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmDialog from "../../utils/ConfirmDialog";
import EditModal from "../../components/EditModal";
import AddPostIconWhite from "/images/add-post-icon-white.png";
import AddPostIcon from "/images/add-post-icon.png";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import API_BASE_URL from "../../config";

const About = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentWork, setCurrentWork] = useState(null);

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
        const [aboutRes, committeeRes] = await Promise.all(
          [
            axios.get(`${API_BASE_URL}/about`),
            axios.get(`${API_BASE_URL}/committee`),
          ],
          {
            withCredentials: true,
          }
        );
        setAbout(aboutRes.data);
        setCommittee(committeeRes.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const onDelete = async (id, name) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/${name}`, {
        data: { [`${name}_id`]: id },
        withCredentials: true,
      });
      if (name === "committee") {
        setCommittee((prev) => prev.filter((c) => c.committee_id !== id));
      }
      if (name === "about") {
        setAbout((prev) => prev.filter((a) => a.about_id !== id));
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const onEdit = (data, name) => {
    setCurrentWork(name);
    setShowEditModal(true);
    if (
      data &&
      data[`${name}_id`] &&
      data[`${name}_title`] &&
      data[`${name}_description`]
    ) {
      setEditData({
        id: data[`${name}_id`],
        title: data[`${name}_title`],
        description: data[`${name}_description`],
      });
    } else setEditData({});
  };

  const edit = async (editData) => {
    try {
      let response;
      if (editData && editData.id && editData.title && editData.description) {
        response = await axios.put(
          `${API_BASE_URL}/${currentWork}`,
          {
            [`${currentWork}_id`]: editData.id,
            [`${currentWork}_title`]: editData.title,
            [`${currentWork}_description`]: editData.description,
          },
          { withCredentials: true }
        );
        if (currentWork && currentWork === "about") {
          setAbout((prev) =>
            prev.map((a) =>
              a.about_id === editData.id ? response.data.data : a
            )
          );
        }
        if (currentWork && currentWork === "committee") {
          setCommittee((prev) =>
            prev.map((c) =>
              c.committee_id === editData.id ? response.data.data : c
            )
          );
        }
      } else if (editData && editData.title && editData.description) {
        response = await axios.post(
          `${API_BASE_URL}/${currentWork}`,
          {
            [`${currentWork}_title`]: editData.title,
            [`${currentWork}_description`]: editData.description,
          },
          { withCredentials: true }
        );
        if (currentWork && currentWork === "about") {
          setAbout((prev) => [...prev, response.data.data]);
        }
        if (currentWork && currentWork === "committee") {
          setCommittee((prev) => [...prev, response.data.data]);
        }
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setEditData(null);
    setCurrentWork(null);
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
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 space-y-10">
        <EditModal
          isOpen={showEditModal}
          editData={editData}
          onEdit={edit}
          onClose={() => setShowEditModal(false)}
        />

        {/* About Section  */}
        <section className="w-full md:w-3/4 space-y-4">
          <div className="flex justify-end pr-1">
            <button
              className="text-green-700 my-1 font-bold md:hover:cursor-pointer"
              onClick={() => onEdit(null, "about")}
            >
              <img className="w-6" src={AddPostIcon} alt="Add+" />
            </button>
          </div>

          {about.map((a) => (
            <div
              key={a.about_id}
              className="relative p-2 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => onEdit(a, "about")}>
                  <FaEdit className="text-blue-400 hover:text-blue-500 text-sm md:text-base" />
                </button>
                <button onClick={() => onDelete(a.about_id, "about")}>
                  <FaTrash className="text-red-400 hover:text-red-500 text-sm md:text-base" />
                </button>
              </div>

              <div className="whitespace-pre-line break-words text-left">
                <p className="font-bangla-bold text-center text-lg md:text-xl mb-1">
                  {a.about_title}
                </p>
                <p className="font-bangla-regular text-sm md:text-base">
                  {a.about_description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Committee Section  */}
        <section className="w-full md:w-3/4 space-y-4">
          <div className="relative mb-2">
            <p className="bg-green-700 rounded-lg text-white py-2 px-4 text-center font-bangla-bold text-lg md:text-xl">
              পরিচালনা কমিটি
              <button
                onClick={() => onEdit(null, "committee")}
                className="absolute right-4 top-2 hover:cursor-pointer"
              >
                <img className="w-5" src={AddPostIconWhite} alt="Add+" />
              </button>
            </p>
          </div>

          <div className="space-y-2">
            {committee.map((c) => (
              <div
                key={c.committee_id}
                className="relative p-4 border border-green-700 rounded-lg hover:bg-green-50 transition-colors"
              >
                {/* Edit/Delete buttons */}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="p-1 rounded-full hover:bg-blue-50 transition"
                    onClick={() => onEdit(c, "committee")}
                  >
                    <FaEdit className="text-blue-400 hover:text-blue-500 text-sm md:text-base" />
                  </button>
                  <button
                    className="p-1 rounded-full hover:bg-red-50 transition"
                    onClick={() => onDelete(c.committee_id, "committee")}
                  >
                    <FaTrash className="text-red-400 hover:text-red-500 text-sm md:text-base" />
                  </button>
                </div>

                <div className="whitespace-pre-line break-words">
                  <p className="font-q-bangla text-base md:text-xl mb-1">
                    {c.committee_title}
                  </p>
                  <p className="font-bangla-regular text-sm md:text-base">
                    {c.committee_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
