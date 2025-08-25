"use client";

import nextDynamic from 'next/dynamic';

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

const PageContentDynamic = nextDynamic(() => import('./PageContent'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="text-lg">Loading PAPI Copy-n-Paste...</div>
    </div>
  ),
});

export default function Page() {
  return <PageContentDynamic />;
}
