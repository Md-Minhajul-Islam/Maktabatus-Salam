import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function TextCard({ data, name, onDelete, onEdit, loggedIn }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 400;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-50 mt-0.5 p-2 text-xs text-justify">
      <div className="relative gap-1">
        {loggedIn && (
          <div className="absolute top-0 right-2 flex gap-2">
            <button onClick={() => onEdit(data)}>
              <FaEdit className="text-gray-300 size-3"></FaEdit>
            </button>
            <button onClick={() => onDelete(data[`${name}_id`])}>
              <FaTrash className="text-gray-300 size-3" />
            </button>
          </div>
        )}
        <div>
          {name !== "blog" && data.updated_at && (
            <div>
              <p className="text-xs font-bangla-light text-gray-400">
                {new Date(data.updated_at).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Dhaka",
                })}
              </p>
            </div>
          )}
          {name === "blog" && loggedIn && (<br/>)}
          <p className="font-bangla-bold whitespace-pre-line break-words text-sm">
            {data[`${name}_title`]}
          </p>
        </div>
      </div>
      <div>
        <p className="font-bangla-regular whitespace-pre-line break-words">
          {expanded
            ? data[`${name}_description`]
            : data[`${name}_description`]?.slice(0, limit) +
              (data[`${name}_description`].length > limit ? ". . ." : "")}
        </p>
        <p className="font-extralight font-mono text-gray-500">
          {data[`${name}_description`].length > limit && (
            <button onClick={toggleExpanded}>
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default TextCard;
