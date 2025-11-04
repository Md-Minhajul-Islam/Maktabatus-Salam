import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaLightbulb, FaTimes } from "react-icons/fa";
import API_BASE_URL from "../config";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TextCard({ data, name, onDelete, onEdit, loggedIn }) {
  const [expanded, setExpanded] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const limit = 400;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleAnalysis = async (text) => {
    setOpenAnalysis(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/analyzer`, {
        text: text,
      });
      if (response.data.analysis) {
        setAnalysis(response.data.analysis);
      }
    } catch (err) {
      setOpenAnalysis(false);
      setAnalysis("");
    }
  };

  return (
    <div className="bg-gray-50 p-2 text-xs text-justify border border-gray-200 rounded-xs m-1">
      {openAnalysis && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-2">
          <div className="relative w-full max-w-3xl bg-gray-50 border border-gray-400 rounded-lg shadow-lg p-3 md:p-5 h-[60vh] md:h-[70vh] overflow-y-auto">
            <button
              onClick={() => setOpenAnalysis(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition"
            >
              <FaTimes className="size-4 md:size-5" />
            </button>

            {/* Analysis content */}

            {analysis ? (
              <div className="font-bangla-regular whitespace-pre-line break-words text-sm md:text-base text-justify mt-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-green-800 text-base md:text-lg mt-6">
                Please wait, data is loading…
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative gap-1">
        <div className="absolute top-0 right-2 flex gap-2">
          {name === "blog" && (
            <button
              className=""
              onClick={() =>
                handleAnalysis(`${data.blog_title}\n${data.blog_description}`)
              }
            >
              <FaLightbulb className="text-gray-300 size-3 md:text-gray-400  md:hover:cursor-pointer"></FaLightbulb>
            </button>
          )}
          {loggedIn && (
            <div className="flex gap-2">
              <button onClick={() => onEdit(data)}>
                <FaEdit className="text-gray-300 size-3 md:text-gray-400  md:hover:cursor-pointer"></FaEdit>
              </button>
              <button onClick={() => onDelete(data[`${name}_id`])}>
                <FaTrash className="text-gray-300 size-3 md:text-gray-400  md:hover:cursor-pointer" />
              </button>
            </div>
          )}
        </div>
        {(name === "blog" || loggedIn) && <br></br>}
        <div>
          {name !== "blog" && data.updated_at && (
            <div>
              <p className="text-xs font-bangla-light text-gray-400 md:text-base">
                {new Date(data.updated_at).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "Asia/Dhaka",
                })}
              </p>
            </div>
          )}
          <p className="font-bangla-bold whitespace-pre-line break-words text-sm md:text-lg">
            {data[`${name}_title`]}
          </p>
        </div>
      </div>
      <div className="md:text-base">
        <p className="font-bangla-regular whitespace-pre-line break-words">
          {expanded
            ? data[`${name}_description`]
            : data[`${name}_description`]?.slice(0, limit) +
              (data[`${name}_description`].length > limit ? ". . ." : "")}
        </p>
        <p className="font-extralight font-mono text-gray-500">
          {data[`${name}_description`].length > limit && (
            <button
              onClick={toggleExpanded}
              className="md:hover:cursor-pointer"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default TextCard;
