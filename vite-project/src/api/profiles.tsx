import { useState } from "react";
import { supabase } from "../config/supabaseClient";

//Post (insert) new profile

export const createNewProfile = async (name: string, email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      name: name,
      email: email,
    })
    .select() //Only returns an array
    .single(); //Returns new row as an object
  if (error) throw error;
  return data;
};

//GET profile

export const getProfileByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("email", email)
    .single();
  if (error) throw error;
  return data;
};

export default function NewProfileForm() {
  //Using useState to set the name, email, and the error/success message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //Verifies that both fields are not empty
  async function handleCreate() {
    //Remove any space from name or email
    if (!name.trim() || !email.trim()) {
      setMessage("Name and email are required.");
      return;
    }
    try {
      //Remvoes any space from both fields and set email to all lower case
      await createNewProfile(name.trim(), email.trim().toLowerCase());
      setName("");
      setEmail("");
      setMessage("Profile created.");
    } catch (err) {
      //Catch in case of error
      console.error(err);
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleCreate}>Create profile</button>
      {message && <p>{message}</p>}
    </div>
  );
}
