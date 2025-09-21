'use client';

import dynamic from 'next/dynamic';

const JobStatusPageClient = dynamic(() => import('./JobStatusPageClient'), { ssr: false });

export default function JobStatusPageWrapper() {
  return <JobStatusPageClient />;
}
