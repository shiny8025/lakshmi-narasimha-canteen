"use client";

import { useRouter } from "next/navigation";

const modes = [
  { label: "Delivery", value: "delivery" },
  { label: "Dine In", value: "dinein" },
  { label: "Takeaway", value: "takeaway" },
];

export default function ModeSelectPage() {
  const router = useRouter();

  const handleSelect = (mode: string) => {
    // Save mode to localStorage or context if needed
    localStorage.setItem("mode", mode);
    router.push(`/menu/${mode}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-2 sm:px-4">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow p-8 flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold mb-4">Select Mode</h2>
        <div className="flex flex-col gap-4 w-full">
          {modes.map((m) => (
            <button
              key={m.value}
              className="w-full py-3 rounded bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition"
              onClick={() => handleSelect(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
