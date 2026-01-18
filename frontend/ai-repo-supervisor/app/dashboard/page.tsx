import Link from "next/link";

import { mockRepos } from "@/app/libs/mockRepos";
import { getHealthLabelFromScore } from "@/src/adapters/prAdapter";

const getStatusClass = (status: string) => {
  if (status === "Critical") {
    return "text-rose-400";
  }
  if (status === "At Risk") {
    return "text-yellow-400";
  }
  return "text-emerald-400";
};

export default function Dashboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 py-10 text-neutral-100 sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-35 blur-[0.5px] bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
            Repository Overview
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            <span className="bg-linear-to-r from-blue-200 via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="mt-2 text-sm text-neutral-300 sm:text-base">
            Track repository health, risk signals, and recent changes at a glance.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mockRepos.map((repo) => {
            const status = getHealthLabelFromScore(repo.health.baseline_score);

            return (
            <Link
              key={repo.name}
              href={`/dashboard/${repo.name}`}
              className="group rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl shadow-black/40 backdrop-blur-xl backdrop-saturate-150 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl hover:shadow-blue-500/15"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-100">
                  {repo.name}
                </h2>
                <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-neutral-200 backdrop-blur-sm">
                  {repo.health.baseline_score.toFixed(1)}
                </span>
              </div>

              <p
                className={`mt-3 text-sm font-semibold ${getStatusClass(
                  status
                )}`}
              >
                {status}
              </p>

              <p className="mt-2 text-sm text-neutral-400">{repo.reason}</p>

              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-neutral-500 transition group-hover:text-neutral-300">
                View details →
              </p>
            </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}