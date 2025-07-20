import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Bienvenue sur JoinUp 🎉</h1>

      <div className="space-y-4 mb-6">
        <button
          onClick={() => navigate('/events')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Voir tous les événements
        </button>

        <button
          onClick={() => navigate('/my-events')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Événements créés
        </button>

        <button
          onClick={() => navigate('/my-participations')}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Événements rejoints
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}
