import GrievanceForm from "@/components/grievance-form";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-teal-100 p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-rose-600 mb-2">
          <span role="img" aria-label="sparkling heart">💕</span> Relationship Feedback <span role="img" aria-label="sparkling heart">💕</span>
        </h1>
        <p className="text-lg text-gray-700">
          Share your thoughts with me, and I&apos;ll respond promptly
        </p>
        <div className="flex justify-center space-x-4 mt-6 mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-rose-300 shadow-md">
            <Image
              src="/images/person1.jpeg"
              alt="Person 1"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-rose-300 shadow-md">
            <Image
              src="/images/person2.jpeg"
              alt="Person 2"
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <GrievanceForm />
      </div>
    </main>
  );
}
