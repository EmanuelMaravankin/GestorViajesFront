import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../features/auth/authClient";


export default function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        setErrorMsg(null);
        setSuccessMsg(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log(data);


        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg(`${data.user.email} ha hecho sign in`);

            emailRef.current.value = "";
            passwordRef.current.value = "";

            navigate("/");
        }
    };

   return (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-12"
    style={{ backgroundImage: "url('/Avion.png')" }}
  >
    <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg sm:max-w-sm w-full">
      <h2 className="text-center text-2xl font-bold tracking-tight text-white mb-6">
        Sign in to Aviones
      </h2>

      {errorMsg && (
        <div className="mb-4 rounded-md border border-red-500 bg-red-100 px-4 py-2 text-sm text-red-800">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 rounded-md border border-green-500 bg-green-100 px-4 py-2 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email address
          </label>
          <input
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-md bg-gray-800 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 block w-full rounded-md bg-gray-800 px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
);
}