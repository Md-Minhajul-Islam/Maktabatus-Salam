import { useState } from "react";

import { FaTrash, FaEdit } from "react-icons/fa";

function EventCard({ data, onDelete, onEdit, loggedIn }) {
  const [expanded, setExpanded] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const limit = 400;

  return (
    <div className="bg-gray-50 mt-0.5 p-2 text-xs text-justify">
      <div className="relative gap-1">
        {loggedIn && (
          <div className="absolute top-0 right-2 flex gap-2">
            <button onClick={() => onEdit(data)}>
              <FaEdit className="text-gray-300 size-3"></FaEdit>
            </button>
            <button onClick={() => onDelete(data.event_id)}>
              <FaTrash className="text-gray-300 size-3" />
            </button>
          </div>
        )}
        <br></br>
        <div>
          <p className="font-bangla-bold whitespace-pre-line break-words">
            {data.event_title}
          </p>
        </div>
      </div>
      <br />
      <div>
        <p className="font-bangla-regular whitespace-pre-line break-words">
          {expanded
            ? data.event_description
            : data.event_description?.slice(0, limit) +
              (data.event_description.length > limit ? ". . ." : "")}
        </p>
        <p className="font-extralight font-mono text-gray-500">
          {data.event_description.length > limit && (
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
      <button
        className="font-mono text-xs bg-green-700 rounded-sm pl-1 pr-1 shadow-xs shadow-green-900 text-white"
        onClick={() => setShowPhotos(!showPhotos)}
      >
        {showPhotos ? "Hide Photos" : "See Photos"}
      </button>
      {showPhotos && (
        <div className="m-2 flex flex-col items-center justify-center gap-2">
          {data.event_photo?.map((photo, index) => (
            <img
              className="max-w-3/4 rounded-sm border border-gray-500"
              key={index}
              src={photo}
              alt="photo"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventCard;
