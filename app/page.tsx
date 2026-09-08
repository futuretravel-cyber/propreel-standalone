"use client";

import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("properties").select("*");
      setProperties(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-6">
          Welcome to PropReel Standalone
        </h1>

        {!user && (
          <div className="flex flex-col gap-8 w-full items-center">
            <SignIn routing="hash" />
            <SignUp routing="hash" />
          </div>
        )}

        {user && (
          <div className="flex flex-col gap-6 w-full">
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              Hello, {user.firstName}! Here are your properties:
            </p>
            <ul className="list-disc pl-6">
              {properties.map((p) => (
                <li key={p.id} className="text-zinc-800 dark:text-zinc-200">
                  {p.title} — R{p.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
