import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-start pt-8 pb-20">
      <Calculator />
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
  <div className="mx-auto max-w-6xl space-y-6">

    {/* YOUR EXISTING CALCULATOR */}
    <Calculator />

    {/* EMAIL CAPTURE SECTION */}
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm border border-slate-200 max-w-2xl mx-auto text-center">
      <h3 className="text-xl font-bold">
        Want a copy of this calculator?
      </h3>

      <p className="mt-2 text-slate-600">
        Get updates, improvements, and future tools.
      </p>

      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded-xl border border-slate-300 px-4 py-3 w-full sm:w-80 text-sm"
        />

        <button
          onClick={() => alert("We’ll hook this up next")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Get Access
        </button>
      </div>
    </section>

  </div>
</main>
  );
}