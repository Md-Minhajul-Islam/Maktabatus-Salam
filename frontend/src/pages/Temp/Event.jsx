// import { useEffect, useState } from "react";
// import axios from "axios";

// import ConfirmDialog from "../utils/ConfirmDialog";
// import EventCard from "../components/EventCard";
// import AddEventModal from "../components/AddEventModal";
// import CheckLoggedIn from "../utils/CheckLoggedIn";
// import AddEventIcon from "/images/add-event-icon.png";
// import API_BASE_URL from "../config";

// const Event = () => {
//   const [event, setEvent] = useState([]);
//   const [editData, setEditData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//     useEffect(() => {
//       const fetchLoggedIn = async () => {
//         setLoggedIn(await CheckLoggedIn());
//       };
//       fetchLoggedIn();
//     }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const eventRes = await axios.get(`${API_BASE_URL}/event`);
//         setEvent(eventRes.data);
//       } catch (err) {
//         setError(err.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteEvent = async (event_id) => {
//     const confirmed = await ConfirmDialog();
//     if (!confirmed) return;
//     try {
//       const deleteRes = await axios.delete(`${API_BASE_URL}/event`, {
//         data: { event_id },
//         withCredentials: true,
//       });
//       setEvent((prev) => prev.filter((e) => e.event_id !== event_id));
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   const onEdit = (data) => {
//     setShowEditModal(true);
//     setEditData(data);
//   };

//   const editEvent = async (editData) => {
//     if (!editData) return;

//     try {
//       const formData = new FormData();
//       formData.append("event_id", editData.event_id || "");
//       formData.append("event_title", editData.event_title);
//       formData.append("event_description", editData.event_description);

//       if (editData.event_photo?.length) {
//         for (let i = 0; i < Math.min(editData.event_photo.length, 5); i++) {
//           formData.append("event_photo", editData.event_photo[i]);
//         }
//       }

//       if (editData.event_id) {
//         const response = await axios.put(
//           `${API_BASE_URL}/event`,
//           formData,
//           { withCredentials: true }
//         );
//         setEvent((prev) =>
//           prev.map((e) =>
//             e.event_id === editData.event_id ? response.data.data : e
//           )
//         );
//       } else {
//         const response = await axios.post(
//           `${API_BASE_URL}/event`,
//           formData,
//           { withCredentials: true }
//         );
//         setEvent((prev) => [response.data.data, ...prev]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }

//     setEditData(null);
//     setShowEditModal(false);
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-green-800 font-bold">
//         Please wait...
//       </p>
//     );
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="md:flex md:flex-col">
//       {loggedIn && (
//         <section className="p-1.5">
//           <button
//             onClick={() => {
//               onEdit({});
//             }}
//             className="text-green-700 right-2 absolute font-bold md:right-1/8 md:hover:cursor-pointer"
//           >
//             <img className="w-5" src={AddEventIcon} alt="Add+" />
//           </button>
//           <br></br>
//         </section>
//       )}

//       {/* event Section */}
//       <section className="h-screen md:w-3/4 md:mx-auto">
//         <AddEventModal
//           isOpen={showEditModal}
//           editData={editData}
//           onEdit={editEvent}
//           onClose={() => {
//             setShowEditModal(false);
//           }}
//         />
//         {event.map((event) => (
//           <EventCard
//             key={event.event_id}
//             data={event}
//             name={"event"}
//             onDelete={deleteEvent}
//             onEdit={onEdit}
//             loggedIn={loggedIn}
//           />
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Event;
