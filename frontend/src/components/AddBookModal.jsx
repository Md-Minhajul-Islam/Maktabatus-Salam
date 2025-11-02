import { useState, useEffect, use } from "react";

export default function EditModal({ isOpen, onClose, editData, onEdit, add }) {
  const [formData, setFormData] = useState({
    book_id: "",
    book_title: "",
    book_description: "",
    book_status: "",
    book_photo: null,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        book_id: editData.book_id || "",
        book_title: editData.book_title || "",
        book_description: editData.book_description || "",
        book_status: editData.book_status || "",
        book_photo: editData.book_photo || null,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    formData.book_photo = e.target.files[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    onEdit(formData, add);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-3 py-4">
      <div className="bg-gray-50 w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-gray-400 p-4 sm:p-6 rounded-md shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 text-sm sm:text-base font-bangla-regular"
        >
          {/* Book ID */}
          <label htmlFor="book_id" className="font-semibold">
            Id:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 text-justify focus:outline-none focus:ring-1 focus:ring-green-700"
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            placeholder="Enter book ID"
            required
            type="text"
          />

          {/* Title */}
          <label htmlFor="book_title" className="font-semibold">
            Title:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 text-justify focus:outline-none focus:ring-1 focus:ring-green-700"
            name="book_title"
            value={formData.book_title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            type="text"
          />

          {/* Description */}
          <label htmlFor="book_description" className="font-semibold">
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-gray-400 rounded-md p-2 text-justify resize-none focus:outline-none focus:ring-1 focus:ring-green-700"
            name="book_description"
            value={formData.book_description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={5}
            required
          ></textarea>

          {/* Status */}
          <label htmlFor="book_status" className="font-semibold">
            Status:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 text-justify focus:outline-none focus:ring-1 focus:ring-green-700"
            name="book_status"
            value={formData.book_status}
            onChange={handleChange}
            placeholder="Available / Unavailable"
            required
            type="text"
          />

          {/* Photo */}
          <label htmlFor="book_photo" className="font-semibold">
            Photo:<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-400 rounded-md p-2 text-sm focus:outline-none"
          />

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold px-5 py-2 rounded-md hover:bg-green-800 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-700 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-800 transition"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
