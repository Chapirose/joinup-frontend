import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem('access');
      const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setDate(data.date);
        setLocation(data.location);
      } else {
        setError("Impossible de charger l'événement.");
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('access');
    const response = await fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, date, location }),
    });

    if (response.ok) {
      navigate(`/events/${id}`);
    } else {
      setError("Erreur lors de la modification de l'événement.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
          Modifier l’événement
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lieu"
          className="w-full p-2 mb-6 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sauvegarder les modifications
        </button>
      </form>
    </div>
  );
}
