import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function MyParticipations() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipations = async () => {
      const token = localStorage.getItem('access');
      const response = await fetch('http://127.0.0.1:8000/api/events/my-participations/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEvents(data);
    };

    fetchParticipations();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Mes participations</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
