import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date, location }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création');
      }

      navigate('/events');
    } catch (err) {
      setError('Échec de la création');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Créer un événement</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Lieu"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Créer
        </button>
      </form>
    </div>
  );
}
