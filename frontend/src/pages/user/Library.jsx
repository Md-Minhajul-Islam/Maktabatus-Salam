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
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <Menu />
      <div className="p-1">
        {/* Search Bar  */}
        <div className="mb-3 flex justify-center">
          <input
            onChange={searchData}
            placeholder="Search. . ."
            className="font-bangla-regular text-sm pl-2 border border-green-800 rounded-2xl md:text-sm md:w-lg"
            type="text"
          />
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
              <th className="border border-green-700 border-collapse">
                Status
              </th>
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
                  <div className="overflow-y-auto">
                    <p className="font-bangla-semibold mb-1 text-sm md:text-base">
                      {book.book_title}
                    </p>
                    <p className="font-bangla-regular">
                      {book.book_description}
                    </p>
                  </div>
                </td>
                <td className="text-center border border-green-700 border-collapse p-0.5">
                  {book.book_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;
