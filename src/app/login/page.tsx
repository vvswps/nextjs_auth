"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await axios.post("/api/users/login", user);
      if (res.data.success) {
        toast.success("Login successful");
        router.push(`/profile/${res.data.username}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <h1 className="mb-6 text-4xl">Login</h1>
      <label className="mb-1 mt-1" htmlFor="email">
        Email
      </label>
      <input
        className="text-black p-2 mb-2 rounded border border-gray-300"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />

      <label className="mb-1 mt-1" htmlFor="password">
        Password
      </label>
      <input
        className="text-black p-2 mb-2 rounded border border-gray-300"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <button
        onClick={onLogin}
        className="mt-4 p-2 px-4 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none hover:text-black ease-in-out transition duration-300"
      >
        Login
      </button>

      <Link href="/signup" className="mt-3 hover:text-teal-500">
        Goto Signup
      </Link>
    </div>
  );
}
