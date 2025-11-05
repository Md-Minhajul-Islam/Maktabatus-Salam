import { useState, useEffect } from "react";

export default function EditModal({ isOpen, onClose, editData, onEdit }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editData) {
      setId(editData.id || "");
      setTitle(editData.title || "");
      setDescription(editData.description || "");
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ id, title, description });
    setId("");
    setTitle("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3 py-4">
      <div className="relative bg-gray-50 w-full max-w-2xl h-auto max-h-[80vh] overflow-y-auto border border-gray-400 rounded-lg shadow-xl p-4 sm:p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-sm sm:text-base font-bangla-regular gap-3"
        >
          {/* Title */}
          <label htmlFor="title" className="font-semibold">
            Title:<span className="text-red-500">*</span>
          </label>
          <textarea
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter a title..."
            rows={2}
            required
            className="border border-gray-400 rounded-md p-2 text-justify resize-none focus:outline-none focus:ring-1 focus:ring-green-700"
          ></textarea>

          {/* Description */}
          <label htmlFor="description" className="font-semibold">
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter description..."
            rows={8}
            required
            className="border border-gray-400 rounded-md p-2 text-justify resize-none focus:outline-none focus:ring-1 focus:ring-green-700"
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-800 transition"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
