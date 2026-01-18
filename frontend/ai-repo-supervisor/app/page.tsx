export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-1/5 h-112 w-md rounded-full bg-fuchsia-400/25 blur-[160px]" />
        <div className="absolute top-1/3 right-8 h-80 w-80 rounded-full bg-indigo-400/20 blur-[140px]" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-cyan-300/15 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-60 blur-[0.5px] bg-[radial-gradient(circle,rgba(148,163,184,0.32)_1px,transparent_1px)] bg-size-[20px_20px]" />
      </div>

      {/* Top-left brand */}
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-300/40 bg-blue-500/30 text-blue-100 shadow-lg shadow-blue-500/30 backdrop-blur-sm">
          P
        </span>
        <span className="text-sm font-semibold tracking-[0.28em] text-purple-50">
          PRISM
        </span>
      </div>

      {/* Centered hero */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full border border-blue-300/30 bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-100 shadow-lg shadow-blue-500/20 backdrop-blur-sm">
          AI Repo Supervisor
        </span>

        {/* Main headline */}
        <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-neutral-50 sm:text-6xl">
          See what your{" "}
          <span className="bg-linear-to-r from-fuchsia-300 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
            GitHub repos
          </span>{" "}
          are really about.
        </h1>

        {/* Subtext */}
        <p className="mt-5 max-w-2xl text-pretty text-base text-neutral-200/90 sm:text-lg">
          PRISM maps architecture, ownership, and risk signals into a single
          dashboard so you can ship with clarity.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/dashboard"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-500/40 transition hover:from-blue-400 hover:to-indigo-400"
          >
            <span className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_55%)]" />
            <span className="relative">Go to Dashboard</span>
          </a>
        </div>

        <div className="mt-12 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-3">
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <h3 className="text-sm font-semibold text-neutral-100">Signals</h3>
            <p className="mt-2 text-xs text-neutral-400">
              Risk, change velocity, and ownership in one view.
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <h3 className="text-sm font-semibold text-neutral-100">Lineage</h3>
            <p className="mt-2 text-xs text-neutral-400">
              Trace dependencies and surface hidden coupling.
            </p>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 shadow-xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <h3 className="text-sm font-semibold text-neutral-100">Focus</h3>
            <p className="mt-2 text-xs text-neutral-400">
              Align teams around the code that matters most.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}