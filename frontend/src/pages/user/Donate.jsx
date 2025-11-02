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
      <div className="flex flex-col items-center font-mono text-md">
        <form
          onSubmit={handleDonation}
          className="flex flex-col m-15 md:text-lg md:gap-3"
        >
          <label htmlFor="amount">Amount(BDT):</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-xs md:w-md"
            type="text"
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-xs md:w-md"
            type="email"
            required
          />
          <button
            type="submit"
            className="w-20 m-3 self-center text-xs p-1 pl-3 pr-3 text-white bg-green-700 rounded-xs md:text-base md:hover:cursor-pointer"
          >
            Donate
          </button>
        </form>
        {tran_id === "cancel" && (
          <p className="text-red-500 font-bold font-mono">Donation Canceled!</p>
        )}
        {tran_id === "fail" && (
          <p className="text-red-500 font-bold font-mono">Donation Failed!</p>
        )}
        {tran_id && tran_id !== "cancel" && tran_id !== "fail" && (
          <div className="font-mono text-center">
            <p className="font-bold text-green-600">Donation Successfull!</p>
            <p>Transaction Id: {tran_id}</p>
            <p>Please check your email for confirmation mail.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
