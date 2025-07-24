import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);
  const [isParticipating, setIsParticipating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async () => {
    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setEvent(data);
      checkParticipation(data.id);
    } else {
      setError("Erreur lors de la récupération des informations de l'événement.");
    }
  };

  const checkParticipation = async (eventId: number) => {
    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/participants/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setIsParticipating(data.isParticipating); // suppose que l'API retourne un champ `isParticipating`
    } else {
      setError("Erreur lors de la vérification de la participation.");
    }
  };

  const handleParticipate = async () => {
    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/participate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setIsParticipating(true);
    } else {
      const data = await response.json();
      setError(data.detail || "Erreur lors de l'inscription.");
    }
  };

  const handleUnparticipate = async () => {
    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/unparticipate/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      setIsParticipating(false);
    } else {
      const data = await response.json();
      setError(data.detail || "Erreur lors de la désinscription.");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {event ? (
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p>{event.description}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
          <p>{event.location}</p>
          <div className="flex gap-2 mt-4">
            {isParticipating ? (
              <button onClick={handleUnparticipate} className="bg-red-500 text-white py-2 px-4 rounded">
                Annuler la participation
              </button>
            ) : (
              <button onClick={handleParticipate} className="bg-green-500 text-white py-2 px-4 rounded">
                Participer
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Chargement de l'événement...</p>
      )}
    </div>
  );
}
