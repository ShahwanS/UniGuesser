"use server"
import { createSSRClient } from "@/app/utils/supabaseServer";




// user registration
export default async function registerUser(username: string) {
  const client = createSSRClient();
  try {
      const { data, error } = await client.from('users').insert([{ username }]).select();
      if (error) {
          console.error('Database insertion error:', error);
          if (error.code === '23505') {
              return { error: "Username already exists. Please choose another." };
          }
          return { error: error.message };
      }
      return { data };
  } catch (err) {
      console.error('Unexpected error:', err);
      return { error: 'Unexpected error occurred. Please try again.' };
  }
}



//image fetching



//score updating