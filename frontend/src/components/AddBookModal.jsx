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
    <div className="fixed inset-0 flex justify-center items-center z-50 p-3">
      <div className="bg-gray-50 w-full h-2/3 flex overflow-y-auto border-1 border-gray-500 p-3 rounded-sm shadow-gray-800 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col text-xs font-mono justify-center gap-3"
        >
          <label htmlFor="book_id">
            Id:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="book_id"
            value={formData.book_id}
            onChange={handleChange}
            placeholder={formData.book_id}
            required
            type="text"
          />
          <label htmlFor="book_title">
            Title:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="book_title"
            value={formData.book_title}
            onChange={handleChange}
            placeholder={formData.book_title}
            required
            type="text"
          />
          <label htmlFor="book_description">
            Description:<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="book_description"
            value={formData.book_description}
            onChange={handleChange}
            placeholder={formData.book_description}
            rows={5}
            required
          ></textarea>
          <label htmlFor="book_status">
            Status:<span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-500 m-0.5 rounded-xs p-1 text-justify"
            name="book_status"
            value={formData.book_status}
            onChange={handleChange}
            placeholder={formData.book_status}
            required
            type="text"
          />
          <label htmlFor="book_photo">
            Photo:<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-500 m-0.5 rounded-xs p-1"
          />

          <div className="flex justify-center gap-2">
            <button
              className="bg-green-800 text-white font-mono m-0.5 rounded-sm pl-2 pr-2 pt-1 pb-1"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-red-800 text-white font-mono m-0.5 rounded-sm p-1"
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
