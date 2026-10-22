import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Prevents/Blocks multiple signup requests while loading

  const { session, signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="max-w-md m-auto pt-24">
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
            onChange={(e) => setEmail(e.target.value)} //Updates the email state with current input
          />
          <input
            placeholder="Password"
            className="p-3 mt-6 border border-white rounded hover:bg-gray-700 focus:bg-gray-700"
            type="password"
            onChange={(e) => setPassword(e.target.value)} //Updates the password state with current input
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full border border-white rounded hover:bg-gray-700"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
