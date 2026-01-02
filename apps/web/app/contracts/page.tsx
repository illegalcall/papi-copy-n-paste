"use client";

import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const ContractsPageContent = nextDynamic(() => import("./contracts-page-content"), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="text-lg">Loading Contract IDE...</div>
    </div>
  ),
});

export default function ContractsPage() {
  return <ContractsPageContent />;
}
