import { useState, useEffect } from "react";

export default function EditModal({ isOpen, onClose, editData, onEdit }) {
  const [formData, setFormData] = useState({
    event_id: "",
    event_title: "",
    event_description: "",
    event_photo: null,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        event_id: editData.event_id || "",
        event_title: editData.event_title || "",
        event_description: editData.event_description || "",
        event_photo: editData.event_photo || null,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, event_photo: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 p-3">
      <div className="bg-gray-50 w-full max-w-md md:max-w-2xl lg:max-w-3xl h-[70vh] md:h-[75vh] overflow-y-auto border border-gray-400 p-4 rounded-md shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col text-sm font-bangla-regular justify-center gap-3"
        >
          {/* Title */}
          <label htmlFor="event_title" className="font-semibold text-gray-700">
            Title:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-400 m-0.5 rounded-sm p-2 text-justify focus:outline-none focus:ring-2 focus:ring-green-700"
            name="event_title"
            value={formData.event_title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
            type="text"
          />

          {/* Description */}
          <label
            htmlFor="event_description"
            className="font-semibold text-gray-700"
          >
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-gray-400 m-0.5 rounded-sm p-2 text-justify resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            placeholder="Enter event description"
            rows={6}
            required
          ></textarea>

          {/* Photos */}
          <label htmlFor="event_photo" className="font-semibold text-gray-700">
            Photos (max 5):<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border border-gray-400 m-0.5 rounded-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-3">
            <button
              className="bg-green-700 text-white font-semibold rounded-sm px-4 py-2 hover:bg-green-800 transition"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-700 text-white font-semibold rounded-sm px-4 py-2 hover:bg-red-800 transition"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
