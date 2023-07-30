"use client";

import React from "react";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
