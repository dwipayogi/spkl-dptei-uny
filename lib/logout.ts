"use client";

import { useRouter } from "next/navigation";

export async function logoutUser() {
  const router = useRouter();

  try {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Redirect to login page after successful logout
      router.push("/auth/login");
      // Force a refresh to clear any client-side state
      router.refresh();
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}
