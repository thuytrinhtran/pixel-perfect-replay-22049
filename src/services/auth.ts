import { supabase } from "@/integrations/supabase/client";
import { getCurrentProfile } from "./auth.functions";
import { loginError, UNASSIGNED_MESSAGE } from "./auth-policy";
export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new Error(loginError(error));
  try {
    const profile = await getCurrentProfile();
    if (!profile) throw new Error(UNASSIGNED_MESSAGE);
    return profile;
  } catch (error) {
    await supabase.auth.signOut();
    throw error;
  }
}