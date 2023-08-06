"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function UserProfile({ params }: { params: { id: String } }) {
  // params are passed as object so we have to destructure it here
  const router = useRouter();
  const logout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const res = await axios.get("/api/users/logout");

      if (res.data.success) {
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  // useEffect(() => {
  //   const resendVerificationEmail = async () => {
  //     try {
  //       const res = await axios.post("/api/users/sendEmail", {
  //         type: "VERIFY",
  //         id: params.id,
  //       });

  //       if (res.data.success) {
  //         toast.success("Email sent successfully");
  //       }
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     }
  //   };
  //   async function checkUser() {
  //     const res = await axios.get("/api/users/isVerified");

  //     if (!res.data.success) {
  //       toast(
  //         `Please verify your email address ${(
  //           <span
  //             onClick={resendVerificationEmail}
  //             className="cursor-pointer text-blue-500"
  //           >
  //             Resend verification email
  //           </span>
  //         )}`,
  //         {
  //           icon: "📧",
  //         }
  //       );
  //     }
  //   }
  //   checkUser();
  // }, [params.id]);

  const getUserId = async () => {
    try {
      const res = await axios.get("/api/users/getId");
      if (res.data.success) {
        toast.success(`Your user id is ${res.data.userId}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Toaster />
      <h1 className="mb-6 text-4xl">
        User Profile
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </h1>

      <button
        className="p-2 mt-2 rounded bg-orange-500 text-black"
        onClick={getUserId}
      >
        Get userId
      </button>

      <button
        className="p-2 mt-2 rounded bg-orange-500 text-black"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
