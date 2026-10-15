import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/super-admin")({
  component: () => (
    <div className="flex items-center justify-center min-h-screen bg-primary-deep text-white">
      <h1 className="text-2xl font-black uppercase italic tracking-widest">Authority Terminal Offline</h1>
    </div>
  ),
});
