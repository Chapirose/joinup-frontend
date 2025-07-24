import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate('/create-event'); // Cette route doit être définie dans votre application pour aller à la page de création d'événements
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700 dark:text-blue-400">
        Bienvenue sur JoinUp 🎉
      </h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate('/events')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Voir tous les événements
        </button>
        <button
          onClick={() => navigate('/my-created-events')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Événements créés
        </button>
        <button
          onClick={() => navigate('/my-participated-events')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
        >
          Événements rejoints
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Déconnexion
        </button>
      </div>
      {/* Ajout du bouton pour accéder à la page de création d'événements */}
      <button
        onClick={handleCreateEventClick}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded mt-4"
      >
        Créer un événement
      </button>
    </div>
  );
}
