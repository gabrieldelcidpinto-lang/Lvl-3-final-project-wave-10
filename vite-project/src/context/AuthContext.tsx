import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../config/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //Children has no type which is generating an error
  const [session, setSession] = useState(undefined);

  //New user sign up
  const signUpNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("There was an error signing up:", error);
      return { success: false, error: error };
    }

    return { succes: true, data: data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); //Session has no type which is generating an error
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); //Session has no type which is generating an error
    });
  }, []);

  //Sign out

  const signOut = () => {
    const { error } = supabase.auth.signOut({ scope: "local" });
    if (error) {
      console.error("There was an error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
