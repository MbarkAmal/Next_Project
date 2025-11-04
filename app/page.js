import { Suspense } from "react";
import HomeClient from "@/components/HomeContent";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading…</p>}>
      <HomeClient />
    </Suspense>
  );
}
