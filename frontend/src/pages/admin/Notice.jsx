import { useEffect, useState } from "react";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";

import axios from "axios";
import ConfirmDialog from "../../utils/ConfirmDialog";
import TextCard from "../../components/TextCard";
import EditModal from "../../components/EditModal";
import AddNoticeIcon from "/images/add-notice-icon.png";
import API_BASE_URL from "../../config";

const Notice = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState([]);
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
        const noticeRes = await axios.get(`${API_BASE_URL}/notice`, {
          withCredentials: true,
        });
        setNotice(noticeRes.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const deleteNotice = async (notice_id) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/notice`, {
        data: { notice_id },
        withCredentials: true,
      });
      setNotice((prev) => prev.filter((b) => b.notice_id !== notice_id));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const onEdit = (data) => {
    setShowEditModal(true);
    if (
      data &&
      data.notice_id &&
      data.notice_title &&
      data.notice_description
    ) {
      setEditData({
        id: data.notice_id,
        title: data.notice_title,
        description: data.notice_description,
      });
    } else setEditData({});
  };

  const editNotice = async (editData) => {
    try {
      let response;
      if (editData && editData.id && editData.title && editData.description) {
        response = await axios.put(
          `${API_BASE_URL}/notice`,
          {
            notice_id: editData.id,
            notice_title: editData.title,
            notice_description: editData.description,
          },
          { withCredentials: true }
        );
        setNotice((prev) =>
          prev.map((b) =>
            b.notice_id === editData.id ? response.data.data : b
          )
        );
      } else if (editData && editData.title && editData.description) {
        response = await axios.post(
          `${API_BASE_URL}/notice`,
          {
            notice_title: editData.title,
            notice_description: editData.description,
          },
          { withCredentials: true }
        );
        setNotice((prev) => [response.data.data, ...prev]);
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
        <div className="flex justify-end pr-1 md:w-3/4">
          <button
            title="Add Notice"
            onClick={() => {
              onEdit({});
            }}
            className="text-green-700 my-2 font-bold md:hover:cursor-pointer"
          >
            <img className="w-6" src={AddNoticeIcon} alt="Add+" />
          </button>
        </div>
        {/* notice Section */}
        <section className="h-screen md:w-3/4 md:mx-auto">
          <EditModal
            isOpen={showEditModal}
            editData={editData}
            onEdit={editNotice}
            onClose={() => {
              setShowEditModal(false);
            }}
          />
          {notice.map((notice) => (
            <TextCard
              key={notice.notice_id}
              data={notice}
              name={"notice"}
              onDelete={deleteNotice}
              onEdit={onEdit}
              loggedIn={loggedIn}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Notice;
