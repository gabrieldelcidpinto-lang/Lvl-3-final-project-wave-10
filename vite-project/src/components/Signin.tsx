import { useState, type FormEvent } from "react";
import { supabase } from "../config/supabaseClient";
import { Link } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError("Wrong email or password.");
      console.error(error);
      return;
    }
    return {
      success: true,
      data: data,
      message: "Successfully signed in!",
    };
  };
  return (
    <div>
      <form className="max-w-md m-auto pt-24" onSubmit={handleSignIn}>
        <h2 className="font-bold pb-2">Sign up</h2>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <div className="flex flex-col py-4">
          <div className="flex flex-row py-4 gap-4">
            <button
              className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
              type="button"
            >
              Assigner
            </button>
            <button
              className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
              type="button"
            >
              Referee
            </button>
          </div>
          <input
            placeholder="Email"
            className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)} //Updates the email state with current input
          />
          <input
            placeholder="Password"
            className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)} //Updates the password state with current input
          />
          <button
            type="submit"
            className="mt-6 w-full border border-white rounded hover:bg-gray-700"
          >
            Sign in
          </button>
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}
