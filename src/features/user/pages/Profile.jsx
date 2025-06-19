import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const { usuario, cargando, logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p>No has iniciado sesión. <Link to="/login" className="text-indigo-400">Iniciar sesión</Link></p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 rounded-full border-2 border-indigo-500 bg-gray-700 flex items-center justify-center">
          <span className="text-2xl font-bold">
            {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
          </span>
        </div>
        <h2 className="mt-4 text-xl text-blue-400">
          Bienvenido {usuario.nombre} {usuario.apellido}
        </h2>
        <p className="mt-2 text-gray-300">{usuario.email}</p>

        <div className="mt-6 flex flex-col gap-4">
          <Link 
            to="/vuelos" 
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            Buscar vuelos
          </Link>
          
          <button
            onClick={handleSignOut}
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
