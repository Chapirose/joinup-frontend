import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentative de connexion avec :", username, password);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log("Réponse brute :", response);

      const data = await response.json();
      console.log("Réponse JSON :", data);

      if (!response.ok) {
        throw new Error(data.detail || 'Échec de connexion');
      }

      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      console.log("Tokens enregistrés dans localStorage");

      navigate('/dashboard');
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
