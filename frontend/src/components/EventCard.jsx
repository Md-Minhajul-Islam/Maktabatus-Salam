import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function EventCard({ data, onDelete, onEdit, loggedIn }) {
  const [expanded, setExpanded] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const limit = 400;

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6 m-2 max-w-3xl mx-auto text-gray-800">
      {loggedIn && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            title="Edit"
            onClick={() => onEdit(data)}
            className="p-1 rounded-full hover:bg-blue-50 transition"
          >
            <FaEdit className="text-blue-400 hover:text-blue-500 text-sm md:text-base" />
          </button>
          <button
            title="Delete"
            onClick={() => onDelete(data.event_id)}
            className="p-1 rounded-full hover:bg-red-50 transition"
          >
            <FaTrash className="text-red-400 hover:text-red-500 text-sm md:text-base" />
          </button>
        </div>
      )}

      <p className="text-xs md:text-sm text-gray-400 mb-1">
        {new Date(data.updated_at).toLocaleDateString("bn-BD", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "Asia/Dhaka",
        })}
      </p>

      <h2 className="font-bangla-bold text-lg md:text-xl mb-2 leading-snug">
        {data.event_title}
      </h2>

      <p className="font-bangla-regular text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line break-words">
        {expanded
          ? data.event_description
          : data.event_description?.slice(0, limit) +
            (data.event_description.length > limit ? "..." : "")}
      </p>

      {data.event_description.length > limit && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-blue-600 text-xs md:text-sm font-medium hover:underline transition"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      {/* Photo Toggle Button */}
      <div className="mt-4">
        <button
          className="text-xs md:text-sm font-mono bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md shadow-sm transition"
          onClick={() => setShowPhotos(!showPhotos)}
        >
          {showPhotos ? "Hide Photos" : "See Photos"}
        </button>
      </div>

      {/*Photos Section*/}
      {showPhotos && data.event_photo?.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 place-items-center">
          {data.event_photo.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Event Photo ${index + 1}`}
              className="w-full sm:w-[90%] max-w-sm rounded-lg border border-gray-300 shadow-sm object-cover hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventCard;
