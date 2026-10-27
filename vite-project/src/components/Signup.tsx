import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError("Sign up failed.");
      console.error(error.message);
      return;
    }
    setSuccess("Sign up successful!");
    console.log("Sign up successful!");
  };

  return (
    <div>
      <form className="max-w-md m-auto pt-24" onSubmit={handleSignUp}>
        <h2 className="font-bold pb-2">Sign up</h2>
        <p>
          Already have an account? <Link to="/signin">Sign in</Link>
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
            Sign up
          </button>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </div>
      </form>
    </div>
  );
}
