import { useEffect, useState } from "react";
import AddBookIcon from "/images/add-book-icon.png";
import AddBookModal from "../components/AddBookModal";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmDialog from "../utils/ConfirmDialog";
import CheckLoggedIn from "../utils/CheckLoggedIn";
import API_BASE_URL from "../config";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLoggedIn = async () => {
      setLoggedIn(await CheckLoggedIn());
    };
    fetchLoggedIn();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get(`${API_BASE_URL}/book`);
        setBooks(bookRes.data);
        setFilteredBooks(bookRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
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
        if (data.book_photo) {
          formData.append("book_photo", data.book_photo);
        }

        if (add) {
          const response = await axios.post(
            `${API_BASE_URL}/book`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );
          setBooks((prev) => [response.data.data, ...prev]);
          setFilteredBooks((prev) => [response.data.data, ...prev]);
        } else {
          const response = await axios.put(
            `${API_BASE_URL}/book`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );
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
      const deleteRes = await axios.delete(`${API_BASE_URL}/book`, {
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
    let value = e.target.value;
    value = value?.trim()?.toLowerCase();
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
      <p className="text-center mt-10 text-green-800 font-bold">
        Please wait...
      </p>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-1">
      {/* Modal Section */}
      {showModal && (
        <AddBookModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          editData={editData}
          onEdit={onEdit}
          add={add}
        />
      )}

      {/* Search Bar  */}
      <div className="relative flex mb-3 justify-center">
        <input
          onChange={searchData}
          placeholder="Search. . ."
          className="font-bangla-regular text-sm pl-2 border border-green-800 rounded-2xl md:text-sm md:w-lg"
          type="text"
        />
        {loggedIn && (
          <button
            onClick={() => openModal(null, true)}
            className="absolute right-2 md:right-1/8 md:hover:cursor-pointer"
          >
            <img className="w-5" src={AddBookIcon} alt="Add+" />
          </button>
        )}
      </div>

      {/* Book List  */}
      <table className="w-full text-xs border border-green-700 border-collapse whitespace-pre-line break-words font-mono md:w-3/4 md:mx-auto md:text-sm">
        <thead className="bg-green-700 text-white md:text-base">
          <tr>
            <th className="border border-green-900 border-collapse">Id</th>
            <th className="border border-green-900 border-collapse">Photo</th>
            <th className="border border-green-900 border-collapse">
              {" "}
              Description{" "}
            </th>
            <th className="border border-green-700 border-collapse">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.book_id}>
              <td className="border border-green-700 border-collapse text-center p-0.5">
                {book.book_id}
              </td>

              <td className="border border-green-700 border-collapse p-0.5">
                <div className="flex justify-center items-center">
                  <img
                    className="object-cover max-w-30 max-h-30 border border-gray-500 rounded-xs shadow-gray-500 shadow-xs md:max-w-50 md:max-h-50"
                    src={book.book_photo}
                    alt="photo"
                  />
                </div>
              </td>

              <td className="border border-green-700 border-collapse p-0.5">
                <div className=" overflow-auto">
                  <p className="font-bangla-semibold mb-1 text-sm md:text-base">
                    {book.book_title}
                  </p>
                  <p className="font-bangla-regular">{book.book_description}</p>
                </div>
              </td>
              <td className="border border-green-700 border-collapse p-0.5">
                <div className="flex flex-col justify-center items-center ">
                  <div>{book.book_status}</div>
                  <br />
                  {loggedIn && (
                    <div className="flex gap-2">
                      <button onClick={() => openModal(book, false)}>
                        <FaEdit className="text-gray-300 size-3 md:text-gray-400  md:hover:cursor-pointer"></FaEdit>
                      </button>
                      <button onClick={() => onDelete(book.book_id)}>
                        <FaTrash className="text-gray-400 size-3 md:text-gray-400  md:hover:cursor-pointer" />
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Library;
