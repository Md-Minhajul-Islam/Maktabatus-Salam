import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";
import Menu from "../../components/Menu";

const About = () => {
  const [about, setAbout] = useState([]);
  const [committee, setCommittee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, committeeRes] = await Promise.all(
          [
            axios.get(`${API_BASE_URL}/about`),
            axios.get(`${API_BASE_URL}/committee`),
          ],
          {
            withCredentials: true,
          }
        );
        setAbout(aboutRes.data);
        setCommittee(committeeRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <div className="md:flex md:flex-col">
      <Menu />
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 space-y-10">
        {/* About Section  */}
        <section className="w-full md:w-3/4 space-y-4">
          {about.map((a) => (
            <div
              key={a.about_id}
              className="relative p-2 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow bg-white"
            >
              <div className="whitespace-pre-line break-words text-left">
                <p className="font-bangla-bold text-center text-lg md:text-xl mb-1">
                  {a.about_title}
                </p>
                <p className="font-bangla-regular text-sm md:text-base">
                  {a.about_description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Committee Section  */}
        <section className="w-full md:w-3/4 space-y-4">
          <div className="relative mb-2">
            <p className="bg-green-700 rounded-lg text-white py-2 px-4 text-center font-bangla-bold text-lg md:text-xl">
              পরিচালনা কমিটি
            </p>
          </div>

          <div className="space-y-2">
            {committee.map((c) => (
              <div
                key={c.committee_id}
                className="relative p-4 border border-green-700 rounded-lg shadow hover:bg-green-50 transition-colors"
              >
                <div className="whitespace-pre-line break-words">
                  <p className="font-q-bangla text-base md:text-xl mb-1">
                    {c.committee_title}
                  </p>
                  <p className="font-bangla-regular text-sm md:text-base">
                    {c.committee_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
