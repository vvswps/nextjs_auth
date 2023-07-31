"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  // TODO: Fix the button disabled logic
  React.useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    // show a toast saying you gotta fill all fields properly
    if (buttonDisabled) {
      toast.error("Fill all fields properly");
      return;
    }
    setButtonDisabled(true);
    const toastId = toast.loading("Talking to the server");
    try {
      const res = await axios.post("/api/users/signup", user);
      if (res.data.status === 201) {
        toast.success("Signup successful\nRedirecting to login page");
        router.push("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      toast.dismiss(toastId);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />

      <h1 className="mb-6 text-4xl">Signup</h1>
      <label className="mb-1 mt-1" htmlFor="username">
        Username
      </label>
      <input
        className="text-black p-2 mb-2 rounded border border-gray-300"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />

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
        onClick={onSignup}
        className="mt-4 p-2 px-4 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none hover:text-black ease-in-out transition duration-300"
        disabled={buttonDisabled}
      >
        Signup
      </button>

      <Link href="/login" className="mt-3 hover:text-teal-500">
        Goto Login
      </Link>
    </div>
  );
}
