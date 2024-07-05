"use client";

import { useRouter } from "next/navigation";
import { usePlayer } from "../context/PlayerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { registerUser, fetchImages } from "@/app/actions";
import toast from "react-hot-toast";
import { useLevel } from "../context/LevelContext";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string(),
});

export default function Registration() {
  const router = useRouter(); // Hook to navigate programmatically
  const { setUsername, setUserID, setScore } = usePlayer();
  const { setImages, setCurrentLevel, images, currentLevel } = useLevel();

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      console.log(fetchedImages);
      if (fetchedImages && fetchedImages.data) {
        setImages(fetchedImages.data);
      }
    };
    loadImages();
  }, [router, setImages]);

  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const loading = isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await registerUser(values.username);
    const fetchedImages = await fetchImages();
    if (result.data && fetchedImages.data) {
      const user = result.data[0];
      setUsername(user.username); // Set the username in the context
      setUserID(user.id); // Set the user ID in the context
      setCurrentLevel(0); // Set the current level to 0
      setScore(0); // Set the score to 0
      setImages(fetchedImages.data); // Set the images in the context
      toast.success("User registered successfully!"); // Show a success message
      router.push(`/game/${user.id}/${images[currentLevel].x_coord}`); // Navigate to the game page
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
                <Input
                  className="text-[16px]"
                  placeholder="Your desired username.."
                  {...field}
                />
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
