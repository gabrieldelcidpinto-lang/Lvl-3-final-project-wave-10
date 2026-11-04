import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { createNewProfile } from "../api/profiles";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      setError("Name, email, and password required.");
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    });
    if (signUpError) {
      setError("Sign up failed.");
      console.error(signUpError.message);
      return;
    }

    try {
      await createNewProfile(cleanName, cleanEmail); //Calling the backend function and two variables as parameters
      setSuccess("Sign up successful!");
      console.log("Sign up successful!");
    } catch (err) {
      console.error(err);
      setError("Profile could not be saved.");
    }
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
            value={name}
            placeholder="Name"
            className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
            type="text"
            required
            onChange={(e) => setName(e.target.value)} //Updates the name state with current input
          />
          <input
            value={email}
            placeholder="Email"
            className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)} //Updates the email state with current input
          />
          <input
            value={password}
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
