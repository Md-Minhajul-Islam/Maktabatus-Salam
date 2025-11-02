import { use, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import AdminMenu from "../../components/AdminMenu";
import CheckLoggedIn from "../../utils/CheckLoggedIn";

const Donation = () => {
  const [donations, setDonations] = useState([]);
  const [totalDonation, setTotalDonation] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const fetchDonations = async () => {
      try {
        const donationRes = await axios.get(`${API_BASE_URL}/donation/list`, {
          withCredentials: true,
        });
        setDonations(donationRes.data.donations);
        setTotalDonation(donationRes.data.total_donation);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchDonations();
  }, []);

  if (loading)
    return (
      <div>
        <AdminMenu />
        <p className="text-center mt-10 text-green-800 font-bold">
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
    <div>
      <AdminMenu />

      <div className="mt-4 p-2 overflow-x-auto w-full">
        {/* Total Donation Info */}
        <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-2 font-mono text-xs sm:text-sm md:text-base mb-3">
          <p className="text-gray-700">Total Donation:</p>
          <p className="font-bold text-green-700">{totalDonation} BDT</p>
        </div>

        {/* Donation Table */}
        <div className="w-full md:w-3/4 md:mx-auto">
          <table className="w-full text-[10px] sm:text-xs md:text-sm lg:text-base text-center border border-green-700 border-collapse font-mono shadow-sm">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="border border-green-900 px-2 py-1">
                  Transaction ID
                </th>
                <th className="border border-green-900 px-2 py-1">Email</th>
                <th className="border border-green-900 px-2 py-1">Amount</th>
                <th className="border border-green-900 px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr
                  key={donation.txn_id}
                  className="hover:bg-green-50 transition-colors duration-200"
                >
                  <td className="border border-green-700 px-2 py-1 break-words">
                    {donation.txn_id}
                  </td>
                  <td className="border border-green-700 px-2 py-1 break-words">
                    {donation.email}
                  </td>
                  <td className="border border-green-700 px-2 py-1">
                    {donation.amount}
                  </td>
                  <td className="border border-green-700 px-2 py-1">
                    {new Date(donation.date).toLocaleString("en-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donation;
