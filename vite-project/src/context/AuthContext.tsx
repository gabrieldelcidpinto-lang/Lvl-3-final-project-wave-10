import {
  createContext,
  useEffect,
  useState,
  useContext,
  type PropsWithChildren,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../config/supabaseClient";

type AuthContextValue = {
  session: Session | null | undefined;
  signUpNewUser: (email: string, password: string) => Promise<void>;
  signInUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<unknown>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  //New user sign up
  const signUpNewUser = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); //Session has no type which is generating an error
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); //Session has no type which is generating an error
    });

    return () => subscription.unsubscribe();
  }, []);

  //Sign in

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("An error occurred signing in: ", error);
        return { success: false, error: error.message };
      }
      console.log("Sign in successfull: ", data);
      return { success: true, data: data, message: "Sign in successfull." };
    } catch (error) {
      //why is error working on line 43 but not on this line?
      console.error("An error occurred signin in: ", error);
    }
  };

  //Sign out

  const signOut = async () => {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
      console.error("There was an error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signOut, signInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("UserAuth must be used within AuthContextProvider.");
  return context;
};
