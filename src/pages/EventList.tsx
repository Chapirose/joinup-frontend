import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  creator_username: string;
  is_participating: boolean;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const token = localStorage.getItem('access');
    const response = await fetch('http://127.0.0.1:8000/api/events/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setEvents(data);
  };

  const handleParticipate = async (eventId: number) => {
    const token = localStorage.getItem('access');
    const response = await fetch(
      `http://127.0.0.1:8000/api/events/${eventId}/participate/`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      console.log(`Inscription confirmée pour l’événement ${eventId}`);
      fetchEvents(); // Mise à jour de la liste
    } else {
      console.error("Erreur lors de l’inscription");
    }
  };

  const handleCardClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Événements à venir</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer"
            onClick={() => handleCardClick(event.id)}
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {event.description}
            </p>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4" />
              <span>Créé par {event.creator_username}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Empêche la redirection si clic sur bouton
                handleParticipate(event.id);
              }}
              disabled={event.is_participating}
              className={`w-full py-2 rounded ${
                event.is_participating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {event.is_participating ? 'Déjà inscrit' : 'Participer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
