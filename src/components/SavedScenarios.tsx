'use client';

import React from 'react';

export default function SavedScenarios({
  onLoad,
  onCompare,
}: {
  onLoad: (s: any) => void;
  onCompare: (s: any) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
      <h3 className="font-bold text-zinc-800 uppercase tracking-tight text-sm">
        Saved Scenarios
      </h3>

      <p className="text-sm text-zinc-400">
        Scenario saving will be added later.
      </p>
    </div>
  );
}