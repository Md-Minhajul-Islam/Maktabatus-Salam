import { useState } from "react";
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

  const toggleExpanded = () => setExpanded(!expanded);

  const handleAnalysis = async (text) => {
    setOpenAnalysis(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/analyzer`, { text });
      if (response.data.analysis) {
        setAnalysis(response.data.analysis);
      }
    } catch (err) {
      setOpenAnalysis(false);
      setAnalysis("");
    }
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-5 mb-3 max-w-3xl mx-auto w-full">
      {/*AI Analysis Modal */}
      {openAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl h-[75vh] overflow-y-auto p-5">
            <button
              onClick={() => setOpenAnalysis(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <FaTimes className="text-xl" />
            </button>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 mt-2">
              AI Analysis
            </h2>

            {analysis ? (
              <div className="font-bangla-regular text-gray-700 leading-relaxed text-sm md:text-base space-y-3">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-green-700 text-center text-base mt-8 animate-pulse">
                Please wait, analyzing your content…
              </p>
            )}
          </div>
        </div>
      )}

      <div className="absolute top-3 right-3 flex items-center gap-2">
        {name === "blog" && (
          <button
            title="Analyze with AI"
            onClick={() =>
              handleAnalysis(`${data.blog_title}\n${data.blog_description}`)
            }
            className="p-1 rounded-full hover:bg-yellow-50 transition"
          >
            <FaLightbulb className="text-yellow-400 hover:text-yellow-500 text-sm md:text-base" />
          </button>
        )}

        {loggedIn && (
          <div className="flex items-center gap-2">
            <button
              title="Edit"
              onClick={() => onEdit(data)}
              className="p-1 rounded-full hover:bg-blue-50 transition"
            >
              <FaEdit className="text-blue-400 hover:text-blue-500 text-sm md:text-base" />
            </button>
            <button
              title="Delete"
              onClick={() => onDelete(data[`${name}_id`])}
              className="p-1 rounded-full hover:bg-red-50 transition"
            >
              <FaTrash className="text-red-400 hover:text-red-500 text-sm md:text-base" />
            </button>
          </div>
        )}
      </div>
      
      {name !== "blog" && data.updated_at && (
        <p className="text-xs text-gray-400 mb-1 md:text-sm">
          {new Date(data.updated_at).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Dhaka",
          })}
        </p>
      )}
      <br/>
      <h2 className="font-bangla-bold text-gray-800 text-lg md:text-xl mb-2 leading-snug">
        {data[`${name}_title`]}
      </h2>

      <p className="font-bangla-regular text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line break-words">
        {expanded
          ? data[`${name}_description`]
          : data[`${name}_description`]?.slice(0, limit) +
            (data[`${name}_description`].length > limit ? "..." : "")}
      </p>

      {data[`${name}_description`].length > limit && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-blue-500 text-xs md:text-sm font-medium hover:underline"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

export default TextCard;
