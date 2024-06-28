"use server"
import { createSSRClient } from "@/app/utils/supabaseServer";




// user registration
export  async function registerUser(username: string) {
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
export async function fetchImages() {
  const client = createSSRClient();
  try {
      const { data, error } = await client.from("images").select("*").order("id", { ascending: true });
      if (error) {
          console.error('Error fetching images:', error);
          return { error: 'Error fetching images', details: error.message };
      }
      if (!data) {
          return { error: 'No image found' };
      }
      return { data };
  } catch (exception) {
      console.error('Exception in GET API:', exception);
      return { error: 'Server error', details: (exception as Error).message };
  }
}



//score updating