"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { mockRepos } from "@/app/libs/mockRepos";

export default function RepoPage() {
  const params = useParams<{ repo?: string | string[] }>();
  const repoParam = params?.repo ?? "";
  const repoName = Array.isArray(repoParam) ? repoParam[0] : repoParam;
  const normalizedRepoName = decodeURIComponent(repoName);

  const repo = mockRepos.find((r) => r.name === normalizedRepoName);

  if (!repo) {
    return (
      <main className="min-h-screen bg-neutral-950 p-8 text-neutral-100">
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
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-neutral-100">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Repository health and recent activity
        </p>
      </header>

      <section className="mb-6 rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <p className="text-3xl font-bold">{repo.healthScore}</p>
        <p className="mt-1 text-sm text-neutral-400">{repo.status}</p>
        <p className="mt-2 text-sm text-neutral-400">{repo.reason}</p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Recent Pull Requests</h2>
        <div className="space-y-3">
          {repo.prs.map((pr) => (
            <div
              key={pr.title}
              className="rounded-lg border border-neutral-800 bg-neutral-900 p-4"
            >
              <p className="font-medium">{pr.title}</p>
              <p className="mt-1 text-sm text-neutral-400">{pr.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Health Trend</h2>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>y-axis: health score</span>
            <span>x-axis: time / PR no.</span>
          </div>
          <div className="mt-3 h-40 rounded-md border border-dashed border-neutral-700 bg-neutral-950/40" />
          <p className="mt-4 text-sm text-neutral-300">
            Reason for recent health: {repo.reason}
          </p>
        </div>
      </section>
    </main>
  );
} 