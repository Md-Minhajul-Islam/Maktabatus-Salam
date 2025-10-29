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
    <div className="fixed inset-0 flex justify-center items-center z-50 p-3">
      <div className="bg-gray-50 w-full h-2/3 flex overflow-y-auto border-1 border-gray-500 p-3 rounded-sm shadow-gray-800 shadow-sm md:w-2/4 md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col text-xs font-mono justify-center gap-3"
        >
          <label htmlFor="event_title">
            Title:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="event_title"
            value={formData.event_title}
            onChange={handleChange}
            placeholder={formData.event_title}
            required
            type="text"
          />
          <label htmlFor="event_description">
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="event_description"
            value={formData.event_description}
            onChange={handleChange}
            placeholder={formData.event_description}
            rows={7}
            required
          ></textarea>
          <label htmlFor="event_photo">
            Photos (5 photos max):<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="border border-gray-500 m-0.5 rounded-xs p-1"
          />

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
