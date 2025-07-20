import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/events/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements');
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Impossible de charger les événements.');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Événements à venir</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">{event.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              📅 {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-gray-700">{event.description}</p>
            <p className="mt-2 text-sm text-gray-600">📍 {event.location}</p>
            <p className="text-sm text-gray-500 mt-1">👤 Organisateur ID : {event.organizer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
