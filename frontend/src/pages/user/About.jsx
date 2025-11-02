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
      {/* About Section  */}
      <section className="text-sm md:w-3/4 md:mx-auto md:text-base">
        {about.map((a) => (
          <div
            key={a.about_id}
            className="m-2 p-1.5 text-justify whitespace-pre-line break-words border-1 border-gray-500 rounded-sm shadow-gray-800 shadow-sm"
          >
            <p className="font-bangla-bold text-center ">{a.about_title}</p>
            <p className="font-bangla-regular">{a.about_description}</p>
          </div>
        ))}
      </section>

      {/* Committee Section  */}
      <section className="text-sm mt-10 m-2 p-1.5 text-justify border-1 border-gray-500 rounded-sm shadow-gray-800 shadow-sm md:w-3/4 md:mx-auto md:text-base">
        <div>
          <p className="bg-green-700 rounded-sm text-white p-0.5 m-1 font-bangla-bold text-center whitespace-pre-line break-words">
            পরিচালনা কমিটি
          </p>
        </div>
        <div className="m-1 p-1.5 border-2 rounded-sm border-green-700 md:text-lg">
          {committee.map((c) => (
            <div
              key={c.committee_id}
              className="shadow-gray-300 shadow-sm rounded-sm p-1.5 whitespace-pre-line break-words"
            >
              <p className="font-q-bangla">{c.committee_title}</p>
              <p className="font-bangla-regular">{c.committee_description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
