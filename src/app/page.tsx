import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('/one-piece-bg.png')] bg-cover bg-center">
      <div className="w-full max-w-md rounded-lg bg-white/90 p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex flex-col items-center">
          <Image
            src="/straw-hat-logo.png"
            alt="Straw Hat Logo"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to the Grand Line
          </h1>
          <p className="text-gray-600">
            {"Log in to join the Straw Hat Pirates's favorite game!"}
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
              footerActionLink: "text-orange-500 hover:text-orange-600",
            },
          }}
        />
      </div>
    </div>
  );
}
