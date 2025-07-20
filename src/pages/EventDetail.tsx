import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  creator_username: string;
  is_creator: boolean;
  is_participating: boolean;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);  // event peut être null
  const [isParticipating, setIsParticipating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setEvent(data);
        setIsParticipating(data.is_participating);
      } else {
        setError("Impossible de charger l'événement.");
      }
    };

    fetchEvent();
  }, [id]);

  // Vérification explicite si `event` est null avant de l'afficher
  if (!event) {
    return <p className="text-center mt-6">Chargement...</p>;
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Es-tu sûr de vouloir supprimer cet événement ?");
    if (!confirm || !event) return;

    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${event.id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      navigate('/events');
    } else {
      alert("Erreur lors de la suppression de l'événement.");
    }
  };

  const handleParticipation = async () => {
    const token = localStorage.getItem('access');
    const method = isParticipating ? 'DELETE' : 'POST';
    const response = await fetch(
      `http://127.0.0.1:8000/api/events/${event.id}/participate/`,
      {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      setIsParticipating(!isParticipating);
    } else {
      alert("Erreur lors de l'inscription/désinscription.");
    }
  };

  // Affichage du message d'erreur si un problème se produit pendant la récupération des données
  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="mb-4">{event.description}</p>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4" />
          <span>Créé par {event.creator_username}</span>
        </div>

        <button
          onClick={handleParticipation}
          className={`w-full py-2 rounded ${isParticipating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          disabled={isParticipating}
        >
          {isParticipating ? 'Désinscrire' : 'Participer'}
        </button>

        {event.is_creator && (
          <div className="flex justify-between gap-4 mt-4">
            <button
              onClick={() => navigate(`/events/${event.id}/edit`)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
              ✏️ Modifier
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
            >
              🗑 Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
