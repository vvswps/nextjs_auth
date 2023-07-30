export default function UserProfile({ params }: { params: { id: String } }) {
  // params are passed as object so we have to destructure it here
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-6 text-4xl">
        User Profile
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </h1>
    </div>
  );
}
