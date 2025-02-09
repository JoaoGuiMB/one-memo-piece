"use client";
import { useState } from "react";
import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { joinRoomAction } from "./actions/room";

export default function LoginPage() {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(""); // State for error message
  const { isSignedIn } = useUser();

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
        {isSignedIn && (
          <form action={joinRoomAction}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Enter room name"
                name="roomName"
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                  setError(""); // Clear error when user types
                }}
                className="w-full"
              />
              {/* Display error message if room name is empty */}
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              Join Room
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
