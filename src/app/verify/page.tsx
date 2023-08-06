"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Verify() {
  const router = useRouter();
  const key = new URLSearchParams(window.location.search).get("key") || "";

  useEffect(() => {
    // Check if email is already verified
    axios
      .post("/api/users/isVerified", { key })
      .then((isVerifiedResponse) => {
        const isVerifiedStatus = isVerifiedResponse.data.status;

        if (isVerifiedStatus === 200) {
          toast.success("Email already verified! You can now login.");
          // sleep for 3 seconds before redirecting to login
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          // Email is not verified, proceed with verification
          const verify = async () => {
            try {
              const res = await axios.post("/api/users/verifyEmail", { key });
              toast.success("res.data.status" + res.data.status);
              if (res.data.status === 200) {
                toast.success("Email verified! You can now login.");
                router.push("/login");
              } else {
                toast.error(
                  "Verification link expired or invalid. Please request a new one."
                );
                router.push("/login");
              }
            } catch (error: any) {
              // toast.error("Something went wrong. Please try again later.");
              toast.error("Client error: " + error.message);
            }
          };
          verify();
        }
      })
      .catch((isVerifiedError) => {
        toast.error(
          "Error checking verification status: " + isVerifiedError.message
        );
      });
  }, [key, router]);

  return (
    <div className="h-screen flex justify-center content-center">
      <Toaster />
      <h1 className="text-2xl font-bold text-gray-800 m-auto">
        Trying to verify your email...
      </h1>
    </div>
  );
}
