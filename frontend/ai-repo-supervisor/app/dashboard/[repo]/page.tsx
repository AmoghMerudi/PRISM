"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { mockRepos } from "@/app/libs/mockRepos";
import RecentPullRequestCard from "@/src/components/RecentPullRequestCard";
import { getHealthLabelFromScore } from "@/src/adapters/prAdapter";

export default function RepoPage() {
  const params = useParams<{ repo?: string | string[] }>();
  const repoParam = params?.repo ?? "";
  const repoName = Array.isArray(repoParam) ? repoParam[0] : repoParam;
  const normalizedRepoName = decodeURIComponent(repoName);

  const repo = mockRepos.find((r) => r.name === normalizedRepoName);

  if (!repo) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 py-10 text-neutral-100 sm:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-48 right-0 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-4xl">
          <h1 className="text-2xl font-bold">Repo not found</h1>
          <p className="mt-2 text-neutral-400">
            We could not find a repo named &quot;
            {normalizedRepoName || "unknown"}&quot;.
          </p>

          <Link
            href="/dashboard"
            className="mt-4 inline-block text-blue-400 hover:underline"
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const healthLabel = getHealthLabelFromScore(repo.health.baseline_score);
  const history = repo.health_history;
  const historyMin = Math.min(...history);
  const historyMax = Math.max(...history);
  const historyRange = historyMax - historyMin || 1;
  const historyStep = Math.max(history.length - 1, 1);
  const historyPoints = history
    .map((value, index) => {
      const x = (index / historyStep) * 100;
      const y = 100 - ((value - historyMin) / historyRange) * 100;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const historyArea = `${historyPoints} 100,100 0,100`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 px-6 py-10 text-neutral-100 sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-48 right-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_55%)]" />
        <div className="absolute inset-0 opacity-35 blur-[0.5px] bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[32px_32px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        <header className="mb-8">
          <Link
            href="/dashboard"
            className="text-xs font-semibold uppercase tracking-widest text-blue-300 hover:text-blue-200"
          >
            Back to dashboard
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl">{repo.name}</h1>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm">
              Health score {repo.health.baseline_score.toFixed(1)}
            </span>
          </div>
          <p className="mt-2 text-sm text-neutral-300 sm:text-base">
            Repository health and recent activity
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-black/40 backdrop-blur-xl backdrop-saturate-150">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Current health
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                {repo.health.baseline_score.toFixed(1)}
              </span>
              <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-semibold text-neutral-200">
                {healthLabel}
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-300">{repo.reason}</p>

            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 shadow-inner shadow-black/40 backdrop-blur-xl backdrop-saturate-150">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>y-axis: health score</span>
                <span>x-axis: time / PR no.</span>
              </div>
              <div className="mt-3 h-36 rounded-md border border-white/20 bg-linear-to-br from-white/20 via-white/10 to-blue-500/10">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="health-area"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={historyArea} fill="url(#health-area)" />
                  <polyline
                    points={historyPoints}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-neutral-300">
                Reason for recent health: {repo.reason}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl shadow-black/40 backdrop-blur-xl backdrop-saturate-150">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Pull Requests</h2>
              <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-neutral-200 backdrop-blur-sm">
                {repo.prs.length} total
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {repo.prs.map((pr) => (
                <RecentPullRequestCard
                  key={pr.title}
                  title={pr.title}
                  analysis={pr.analysis}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 