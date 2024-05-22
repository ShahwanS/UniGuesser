import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createSSRClient(serverComponent = false) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name,value,options) {
          if(serverComponent) return;

          cookies().set(name,value,options);
        },
        remove(name, options): void {
          if(serverComponent) return;

          cookies().set(name, "", options);
        }
      }
    }
  )
}



export function createSupabaseServerComponentClient() {
  return createSSRClient(true);
}