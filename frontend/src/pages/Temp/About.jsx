// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import ConfirmDialog from "../utils/ConfirmDialog";
// import EditModal from "../components/EditModal";
// import AddPostIconWhite from "/images/add-post-icon-white.png";
// import AddPostIcon from "/images/add-post-icon.png";
// import CheckLoggedIn from "../utils/CheckLoggedIn";
// import API_BASE_URL from "../config";

// const About = () => {
//   const [about, setAbout] = useState([]);
//   const [committee, setCommittee] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentWork, setCurrentWork] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const fetchLoggedIn = async () => {
//       setLoggedIn(await CheckLoggedIn());
//     };
//     fetchLoggedIn();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [aboutRes, committeeRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/about`),
//           axios.get(`${API_BASE_URL}/committee`),
//         ]);
//         setAbout(aboutRes.data);
//         setCommittee(committeeRes.data);
//       } catch (err) {
//         setError(err.response.data.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const onDelete = async (id, name) => {
//     const confirmed = await ConfirmDialog();
//     if (!confirmed) return;
//     try {
//       const deleteRes = await axios.delete(`${API_BASE_URL}/${name}`, {
//         data: { [`${name}_id`]: id },
//         withCredentials: true,
//       });
//       if (name === "committee") {
//         setCommittee((prev) => prev.filter((c) => c.committee_id !== id));
//       }
//       if (name === "about") {
//         setAbout((prev) => prev.filter((a) => a.about_id !== id));
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   const onEdit = (data, name) => {
//     setCurrentWork(name);
//     setShowEditModal(true);
//     if (
//       data &&
//       data[`${name}_id`] &&
//       data[`${name}_title`] &&
//       data[`${name}_description`]
//     ) {
//       setEditData({
//         id: data[`${name}_id`],
//         title: data[`${name}_title`],
//         description: data[`${name}_description`],
//       });
//     } else setEditData(null);
//   };

//   const edit = async (editData) => {
//     try {
//       let response;
//       if (editData && editData.id && editData.title && editData.description) {
//         response = await axios.put(
//           `${API_BASE_URL}/${currentWork}`,
//           {
//             [`${currentWork}_id`]: editData.id,
//             [`${currentWork}_title`]: editData.title,
//             [`${currentWork}_description`]: editData.description,
//           },
//           { withCredentials: true }
//         );
//         if (currentWork && currentWork === "about") {
//           setAbout((prev) =>
//             prev.map((a) =>
//               a.about_id === editData.id ? response.data.data : a
//             )
//           );
//         }
//         if (currentWork && currentWork === "committee") {
//           setCommittee((prev) =>
//             prev.map((c) =>
//               c.committee_id === editData.id ? response.data.data : c
//             )
//           );
//         }
//       } else if (editData && editData.title && editData.description) {
//         response = await axios.post(
//           `${API_BASE_URL}/${currentWork}`,
//           {
//             [`${currentWork}_title`]: editData.title,
//             [`${currentWork}_description`]: editData.description,
//           },
//           { withCredentials: true }
//         );
//         if (currentWork && currentWork === "about") {
//           setAbout((prev) => [...prev, response.data.data]);
//         }
//         if (currentWork && currentWork === "committee") {
//           setCommittee((prev) => [...prev, response.data.data]);
//         }
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//     setEditData(null);
//     setCurrentWork(null);
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
//       <EditModal
//         isOpen={showEditModal}
//         editData={editData}
//         onEdit={edit}
//         onClose={() => {
//           setShowEditModal(false);
//         }}
//       />

//       {/* About Section  */}
//       <section className="text-sm md:w-3/4 md:mx-auto md:text-base">
//         {loggedIn && (
//           <div className="relative">
//             <button
//               onClick={() => {
//                 onEdit(null, "about");
//               }}
//               className="top-1 right-2 absolute"
//             >
//               <img
//                 className="w-5 md:hover:cursor-pointer"
//                 src={AddPostIcon}
//                 alt="Add+"
//               />
//             </button>
//           </div>
//         )}
//         <br />
//         {about.map((a) => (
//           <div
//             key={a.about_id}
//             className=" relative m-2 p-1.5 text-justify border-1 border-gray-500 rounded-sm shadow-gray-800 shadow-sm"
//           >
//             {loggedIn && (
//               <div className="absolute top-1 right-2 flex gap-2">
//                 <button onClick={() => onEdit(a, "about")}>
//                   <FaEdit className="text-gray-300 size-3 md:text-gray-400 md:hover:cursor-pointer"></FaEdit>
//                 </button>
//                 <button onClick={() => onDelete(a.about_id, "about")}>
//                   <FaTrash className="text-gray-300 size-3 md:text-gray-400 md:hover:cursor-pointer" />
//                 </button>
//               </div>
//             )}
//             <div className="whitespace-pre-line break-words">
//               <p className="font-bangla-bold text-center ">{a.about_title}</p>
//               <p className="font-bangla-regular">{a.about_description}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Committee Section  */}
//       <section className="text-sm mt-10 m-2 p-1.5 text-justify border-1 border-gray-500 rounded-sm shadow-gray-800 shadow-sm md:w-3/4 md:mx-auto md:text-base">
//         <div className="relative">
//           <p className="bg-green-700 rounded-sm text-white p-0.5 m-1 font-bangla-bold text-center whitespace-pre-line break-words">
//             পরিচালনা কমিটি
//             {loggedIn && (
//               <span>
//                 <button
//                   onClick={() => {
//                     onEdit({}, "committee");
//                   }}
//                   className="right-2 absolute font-bold md:hover:cursor-pointer"
//                 >
//                   <img className="w-5" src={AddPostIconWhite} alt="Add+" />
//                 </button>
//               </span>
//             )}
//           </p>
//         </div>
//         <div className="m-1 p-1.5 border-2 rounded-sm border-green-700 md:text-lg">
//           {committee.map((c) => (
//             <div
//               key={c.committee_id}
//               className="relative shadow-gray-300 shadow-sm rounded-sm p-1.5 whitespace-pre-line break-words"
//             >
//               {loggedIn && (
//                 <div className="absolute top-1 right-2 flex gap-2">
//                   <button onClick={() => onEdit(c, "committee")}>
//                     <FaEdit className="text-gray-300 size-3 md:text-gray-400 md:hover:cursor-pointer"></FaEdit>
//                   </button>
//                   <button onClick={() => onDelete(c.committee_id, "committee")}>
//                     <FaTrash className="text-gray-300 size-3 md:text-gray-400 md:hover:cursor-pointer" />
//                   </button>
//                 </div>
//               )}
//               <div>
//                 <p className="font-q-bangla">{c.committee_title}</p>
//                 <p className="font-bangla-regular">{c.committee_description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
