// src/pages/MyCreatedEvents.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default function MyCreatedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchCreatedEvents = async () => {
    const token = localStorage.getItem('access');
    const response = await fetch('http://127.0.0.1:8000/api/events/my-events/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setEvents(data);
  };

  const handleDelete = async (eventId: number) => {
    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  useEffect(() => {
    fetchCreatedEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Mes événements créés</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/events/${event.id}/edit`)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
