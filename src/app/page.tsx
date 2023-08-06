import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <h1 className="text-6xl font-bold">Next-auth</h1>

      <p className="text-xl text-center mt-8 w-1/2">
        Not to be confused with any library or package, this is a simple project
        to understand how to implement authentication in Next.js.
        <br />
        <br />
        For now it only supports email and password authentication. I will add
        more providers in the future. Maybe use a library like next-auth.
      </p>

      <footer className="flex gap-8 mt-8">
        <Link
          href="/login"
          className="text-2xl text-gray-500 border-b-2 border-transparent transition-transform transform-gpu hover:scale-110 hover:border-indigo-500 hover:text-indigo-500"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-2xl text-gray-500 border-b-2 border-transparent transition-transform transform-gpu hover:scale-110 hover:border-green-500 hover:text-green-500"
        >
          Signup
        </Link>
      </footer>
    </div>
  );
}
