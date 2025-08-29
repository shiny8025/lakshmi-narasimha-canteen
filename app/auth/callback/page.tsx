"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseBrowser";


export default function AuthCallback() {
  const router = useRouter();
  useEffect(() => {
    // Refresh session and redirect to profile
    supabaseBrowser().auth.getSession().then(() => {
      router.replace("/profile");
    });
  }, [router]);

  return <main style={{ padding: 24 }}>Signing you in...</main>;
}
