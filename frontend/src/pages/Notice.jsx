import { useEffect, useState } from "react";
import axios from "axios";

import ConfirmDialog from "../utils/ConfirmDialog";
import TextCard from "../components/TextCard";
import EditModal from "../components/EditModal";
import AddNoticeIcon from "/images/add-notice-icon.png";
import CheckLoggedIn from "../utils/CheckLoggedIn";
import API_BASE_URL from "../config";

const Notice = () => {
  const [notice, setNotice] = useState([]);
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
        const noticeRes = await axios.get(`${API_BASE_URL}/notice`);
        setNotice(noticeRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
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
      <p className="text-center mt-10 text-green-800 font-bold">
        Please wait...
      </p>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      {loggedIn && (
        <section className="p-1.5">
          <button
            onClick={() => {
              onEdit({});
            }}
            className="text-green-700 right-2 absolute font-bold"
          >
            <img className="w-5" src={AddNoticeIcon} alt="Add+" />
          </button>
          <br></br>
        </section>
      )}

      {/* notice Section */}
      <section className="h-screen">
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
  );
};

export default Notice;
