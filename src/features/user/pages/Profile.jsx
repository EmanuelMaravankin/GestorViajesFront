import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../auth/authClient";
import { Link } from "react-router-dom";


export default function Profile() {
  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchAvatarFromProfile(session.user.id);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchAvatarFromProfile(session.user.id);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchAvatarFromProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", userId)
      .single();

    if (data?.avatar_url) {
      setAvatarUrl(data.avatar_url);
    }
  };



  const handleUpload = async (event) => {
  const file = event.target.files[0]; // ✅ esta línea define 'file'

  if (!file || !session?.user?.id) {
    console.error("Archivo o sesión no disponible");
    return;
  }

  const filePath = `${session.user.id}/avatar.png`;

  const { error: uploadError } = await supabase.storage
    .from("avatarpnt2")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Error al subir imagen:", uploadError);
    alert("Error al subir la imagen.");
    return;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("avatarpnt2")
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;

  if (publicUrl) {
    await supabase
      .from("profiles")
      .upsert({ id: session.user.id, avatar_url: publicUrl }, { onConflict: ["id"] });
    setAvatarUrl(publicUrl);
  }
};

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
      <div className="text-center">
        <img
          src={avatarUrl || "https://i.pravatar.cc/150?u=default"}
          alt="User Avatar"
          className="mx-auto h-24 w-24 rounded-full border-2 border-indigo-500 object-cover"
        />
        <h2 className="mt-4 text-sm text-blue-400">
          Bienvenido {session.user.email}
        </h2>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleUpload}
        />

        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={() => fileInputRef.current.click()}
            className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            Cambiar imagen
          </button>

           <Link to="/vuelos" className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            Mis vuelos
          </Link>

           
           <Link to="/vuelos" className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500"
          >
            Buscar vuelos
          </Link>
        </div>
      </div>
    </div>
  );
}
