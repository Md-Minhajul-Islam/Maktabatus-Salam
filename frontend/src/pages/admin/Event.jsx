import { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/AdminMenu";
import ConfirmDialog from "../../utils/ConfirmDialog";
import EventCard from "../../components/EventCard";
import AddEventModal from "../../components/AddEventModal";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AddEventIcon from "/images/add-event-icon.png";
import API_BASE_URL from "../../config";

const Event = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
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
        const eventRes = await axios.get(`${API_BASE_URL}/event`);
        setEvent(eventRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteEvent = async (event_id) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/event`, {
        data: { event_id },
        withCredentials: true,
      });
      setEvent((prev) => prev.filter((e) => e.event_id !== event_id));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const onEdit = (data) => {
    setShowEditModal(true);
    setEditData(data);
  };

  const editEvent = async (editData) => {
    if (!editData) return;

    try {
      const formData = new FormData();
      formData.append("event_id", editData.event_id || "");
      formData.append("event_title", editData.event_title);
      formData.append("event_description", editData.event_description);

      if (editData.event_photo?.length) {
        for (let i = 0; i < Math.min(editData.event_photo.length, 5); i++) {
          formData.append("event_photo", editData.event_photo[i]);
        }
      }

      if (editData.event_id) {
        const response = await axios.put(`${API_BASE_URL}/event`, formData, {
          withCredentials: true,
        });
        setEvent((prev) =>
          prev.map((e) =>
            e.event_id === editData.event_id ? response.data.data : e
          )
        );
      } else {
        const response = await axios.post(`${API_BASE_URL}/event`, formData, {
          withCredentials: true,
        });
        setEvent((prev) => [response.data.data, ...prev]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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
        <button
          onClick={() => {
            onEdit({});
          }}
          className="text-green-700 mt-1 right-2 absolute font-bold md:right-1/8 md:hover:cursor-pointer"
        >
          <img className="w-5" src={AddEventIcon} alt="Add+" />
        </button>
        <br></br>
        {/* event Section */}
        <section className="h-screen md:w-3/4 md:mx-auto">
          <AddEventModal
            isOpen={showEditModal}
            editData={editData}
            onEdit={editEvent}
            onClose={() => {
              setShowEditModal(false);
            }}
          />
          {event.map((event) => (
            <EventCard
              key={event.event_id}
              data={event}
              name={"event"}
              onDelete={deleteEvent}
              onEdit={onEdit}
              loggedIn={loggedIn}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Event;
