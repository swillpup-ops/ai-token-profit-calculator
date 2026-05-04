"use client";

import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <>
      <Calculator />

      <section className="bg-slate-50 px-4 pb-10 text-slate-900">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm border border-slate-200 text-center">
          <h3 className="text-xl font-bold">
            Want a copy of this calculator?
          </h3>

          <p className="mt-2 text-slate-600">
            Get updates, improvements, and future tools.
          </p>

          <div className="mt-6">
            <div className="ml-embedded" data-form="DXIMd2"></div>
          </div>
        </div>
      </section>
    </>
  );
}