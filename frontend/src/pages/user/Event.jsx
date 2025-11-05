import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import EventCard from "../../components/EventCard";
import API_BASE_URL from "../../config";

const Event = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await axios.get(`${API_BASE_URL}/event`, {
          withCredentials: true,
        });
        setEvent(eventRes.data);
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
    <div>
      <Menu />
      <div className="md:flex md:flex-col">
        {/* event Section */}
        <section className="h-screen md:w-3/4 md:mx-auto">
          {event.map((event) => (
            <EventCard
              key={event.event_id}
              data={event}
              name={"event"}
            />
          ))}
        </section>
      </div>
    </div>
  );
};
export default Event;
