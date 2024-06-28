"use client";

import { useRouter } from "next/navigation";
import { usePlayer } from "../context/PlayerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import registerUser from "@/app/actions";
import toast from "react-hot-toast";
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function Registration() {
  const router = useRouter(); // Hook to navigate programmatically
  const { setUsername, setUserID } = usePlayer();

  //  Define  form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const loading = isSubmitting || !isValid;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await registerUser(values.username);
    if (result.error) {
      toast.error(result.error); // Set the error message
    } else if (result.data) {
      const user = result.data[0];
      setUsername(user.username); // Set the username in the context
      setUserID(user.id); // Set the user ID in the context
      toast.success("User registered successfully!"); // Show a success message
      router.push(`/game/${user.id}`); // Navigate to the game page
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your desired username.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold text-lg transition-colors disabled:bg-indigo-600 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Start Guessing
        </Button>
      </form>
    </Form>
  );
}
