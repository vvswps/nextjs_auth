"use client";

import React from "react";
import { useRouter } from "next/router";
import { Axios } from "axios";
import Link from "next/link";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
      >
        Signup
      </button>

      <Link href="/login" className="mt-3 hover:text-teal-500">
        Goto Login
      </Link>
    </div>
  );
}
