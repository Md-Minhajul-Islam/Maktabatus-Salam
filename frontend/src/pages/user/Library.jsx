import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import Menu from "../../components/Menu";

const Library = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      <div>
        <Menu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );
  if (error)
    return (
      <div>
        <Menu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div>
      <Menu />
      <div className="p-1">
        {/* Search Bar  */}
        <div className="relative flex justify-center mb-4">
          <input
            onChange={searchData}
            placeholder="Search books..."
            className="font-bangla-regular w-full max-w-md text-sm pl-4 pr-10 py-2 border border-green-800 rounded-full shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
            type="text"
          />
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
