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
    <div className="fixed inset-0 flex justify-center items-center z-50 p-3">
      <div className="bg-gray-50 w-full h-1/2 flex overflow-y-auto border-1 border-gray-500 p-3 rounded-sm shadow-gray-800 shadow-sm md:w-2/4">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col text-xs font-mono justify-center gap-3"
        >
          <label htmlFor="title">
            Title:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border-1 border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder={title}
            rows={2}
            required
          ></textarea>
          <label htmlFor="description">
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border-1 border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder={description}
            rows={10}
            required
          ></textarea>
          <div className="flex justify-center gap-2">
            <button
              className="bg-green-800 text-white font-mono m-0.5 rounded-sm pl-2 pr-2 pt-1 pb-1 md:hover:cursor-pointer"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-800 text-white font-mono m-0.5 rounded-sm p-1 md:hover:cursor-pointer"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
