import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Tentative d'inscription avec :", { username, email, password });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      console.log("📬 Réponse brute :", response);

      const data = await response.json();
      console.log("📬 Réponse JSON :", data);

      if (!response.ok) {
        throw new Error(data.detail || "Erreur lors de l'inscription");
      }

      console.log("✅ Inscription réussie, redirection vers /login");
      navigate('/');
    } catch (err) {
      console.error("❌ Erreur d'inscription :", err);
      setError("L'inscription a échoué");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Inscription</h1>
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
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          S’inscrire
        </button>
      </form>
    </div>
  );
}
