import Link from "next/link";

import { mockRepos } from "@/app/libs/mockRepos";

const getStatusClass = (status: string) =>
  status === "At Risk" ? "text-yellow-400" : "text-emerald-400";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-neutral-100">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Overview of repository health and activity
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRepos.map((repo) => (
          <Link
            key={repo.name}
            href={`/dashboard/${repo.name}`}
            className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition hover:border-neutral-600 hover:bg-neutral-900/80"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{repo.name}</h2>
              <span className="text-sm text-neutral-400">
                {repo.healthScore}
              </span>
            </div>

            <p className={`mt-2 text-sm font-medium ${getStatusClass(repo.status)}`}>
              {repo.status}
            </p>

            <p className="mt-2 text-sm text-neutral-400">{repo.reason}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}