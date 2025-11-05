import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import API_BASE_URL from "../../config";
import { useParams } from "react-router-dom";

const Login = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { tran_id } = useParams();

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/donation`,
        {
          amount,
          email,
        },
        { withCredentials: true }
      );
      setAmount("");
      setEmail("");
      window.location.href = response.data.url;
    } catch (err) {
      setError(err.response.data.message || "Donation Failed!");
    }
  };

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
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 space-y-6">
        <form
          onSubmit={handleDonation}
          className="mt-20 w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4 md:space-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="amount" className="mb-1 font-medium text-gray-700">
              Amount (BDT)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="text"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold rounded-lg py-2 mt-2 hover:bg-green-800 transition-transform hover:scale-105"
          >
            Donate
          </button>
        </form>

        {/* Transaction Messages  */}
        <div className="w-full max-w-md text-center space-y-2">
          {tran_id && tran_id === "cancel" && (
            <p className="text-red-500 font-bold">Donation Canceled!</p>
          )}
          {tran_id && tran_id === "fail" && (
            <p className="text-red-500 font-bold">Donation Failed!</p>
          )}
          {tran_id && tran_id !== "cancel" && tran_id !== "fail" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
              <p className="font-bold">Donation Successful!</p>
              <p>Transaction Id: {tran_id}</p>
              <p>Please check your email for confirmation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
