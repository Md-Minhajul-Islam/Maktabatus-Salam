import { useEffect, useState } from "react";
import axios from "axios";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import AddBookIcon from "/images/add-book-icon.png";
import AddBookModal from "../../components/AddBookModal";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmDialog from "../../utils/ConfirmDialog";
import API_BASE_URL from "../../config";

const Library = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [add, setAdd] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`${API_BASE_URL}/book`, {
          withCredentials: true,
        });
        setBooks(bookRes.data);
        setFilteredBooks(bookRes.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const openModal = (data, add) => {
    setShowModal(true);
    setEditData(data);
    setAdd(add);
  };

  const onEdit = async (data, add) => {
    try {
      if (
        data &&
        data.book_id &&
        data.book_title &&
        data.book_description &&
        data.book_status
      ) {
        const formData = new FormData();
        formData.append("book_id", data.book_id);
        formData.append("book_title", data.book_title);
        formData.append("book_description", data.book_description);
        formData.append("book_status", data.book_status);
        if (data.book_photo) formData.append("book_photo", data.book_photo);

        if (add) {
          const response = await axios.post(`${API_BASE_URL}/book`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          setBooks((prev) => [response.data.data, ...prev]);
          setFilteredBooks((prev) => [response.data.data, ...prev]);
        } else {
          const response = await axios.put(`${API_BASE_URL}/book`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          setBooks((prev) =>
            prev.map((b) =>
              b.book_id === data.book_id ? response.data.data : b
            )
          );
          setFilteredBooks((prev) =>
            prev.map((b) =>
              b.book_id === data.book_id ? response.data.data : b
            )
          );
        }
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setEditData(null);
    setShowModal(false);
    setAdd(false);
  };

  const onDelete = async (book_id) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;
    try {
      await axios.delete(`${API_BASE_URL}/book`, {
        data: { book_id },
        withCredentials: true,
      });
      setBooks((prev) => prev.filter((b) => b.book_id !== book_id));
      setFilteredBooks((prev) => prev.filter((b) => b.book_id !== book_id));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const searchData = (e) => {
    let value = e.target.value?.trim()?.toLowerCase();
    if (value === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.book_id.toLowerCase().includes(value) ||
          book.book_title.includes(value) ||
          book.book_description.includes(value) ||
          book.book_status.toLowerCase().includes(value)
      );
      setFilteredBooks(filtered);
    }
  };

  if (loading)
    return (
      <div>
        <AdminMenu />
        <p className="text-center mt-10 text-green-800 font-bold animate-pulse">
          Please wait...
        </p>
      </div>
    );

  if (!loggedIn)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-lg font-bold text-center m-5">
          Unauthorized!
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminMenu />
      <div className="p-3 md:p-6">
        {showModal && (
          <AddBookModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            editData={editData}
            onEdit={onEdit}
            add={add}
          />
        )}

        {/* Search Bar  */}
        <div className="relative flex justify-center mb-4">
          <input
            onChange={searchData}
            placeholder="Search books..."
            className="font-bangla-regular w-full max-w-md text-sm pl-4 pr-10 py-2 border border-green-800 rounded-full shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
            type="text"
          />
          <button
            title="Add Book"
            onClick={() => openModal(null, true)}
            className="absolute right-[10%] top-1/2 -translate-y-1/2 md:right-[30%] hover:cursor-pointer"
          >
            <img className="w-6" src={AddBookIcon} alt="Add" />
          </button>
        </div>

        {/* Table  */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-green-700 rounded-lg overflow-hidden text-xs md:text-sm shadow-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-2 px-3 text-center">ID</th>
                <th className="py-2 px-3 text-center">Photo</th>
                <th className="py-2 px-3 text-left">Description</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr
                  key={book.book_id}
                  className="border-t border-green-100 hover:bg-green-50 transition"
                >
                  <td className="p-2 text-center text-gray-700 font-semibold">
                    {book.book_id}
                  </td>

                  <td className="p-2 text-center">
                    <img
                      className="w-20 h-20 object-cover rounded-sm border border-gray-300 mx-auto shadow-sm"
                      src={book.book_photo}
                      alt="Book"
                    />
                  </td>

                  <td className="p-2">
                    <p className="font-bangla-semibold text-gray-900 whitespace-pre-line break-words">
                      {book.book_title}
                    </p>
                    <p className="font-bangla-regular text-gray-600 text-xs md:text-sm mt-1 whitespace-pre-line break-words">
                      {book.book_description}
                    </p>
                  </td>

                  <td className="p-2 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        book.book_status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {book.book_status}
                    </span>
                    <div className="flex justify-center gap-3 mt-2">
                      <button
                        onClick={() => openModal(book, false)}
                        className="text-blue-400 hover:text-blue-500 text-sm md:text-base"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(book.book_id)}
                        className="text-red-400 hover:text-red-500 text-sm md:text-base"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBooks.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-5 italic"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Library;
