'use client';

import React from 'react';

export default function ComparisonView({
  scenarios,
  onClose,
}: {
  scenarios: any[];
  onClose: () => void;
}) {
  if (!scenarios.length) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Comparison</h2>

        {scenarios.map((s, i) => (
          <div key={i} className="border-b py-2">
            {s.name}
          </div>
        ))}

        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}