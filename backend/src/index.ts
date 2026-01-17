import * as github from "@actions/github";
import fetch from "node-fetch";
import { execSync } from "child_process";

const token = process.env.GITHUB_TOKEN!;
const backendUrl = process.env.BACKEND_URL!;

async function run() {
  const context = github.context;
  const pr = context.payload.pull_request;

  if (!pr) return;

  const octokit = github.getOctokit(token);

  // Get PR diff
  const diff = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pr.number,
      headers: { accept: "application/vnd.github.v3.diff" },
    }
  );

  // Simple lint signal (example)
  let lintPassed = true;
  try {
    execSync("npm run lint", { stdio: "ignore" });
  } catch {
    lintPassed = false;
  }

  const payload = {
    repo: `${context.repo.owner}/${context.repo.repo}`,
    pr_number: pr.number,
    author: pr.user.login,
    additions: pr.additions,
    deletions: pr.deletions,
    changed_files: pr.changed_files,
    diff: diff.data,
    lint_passed: lintPassed,
  };

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const analysis = await res.json();

  const commentBody = `
## 🤖 AI Repo Supervisor

### Summary
${analysis.summary}

### Risk Indicators
${analysis.risks.map((r: string) => `- ⚠️ ${r}`).join("\n")}

### Suggested Actions (Human decides)
${analysis.suggestions.map((s: string) => `- 👉 ${s}`).join("\n")}

**Repo Risk Score Change:** ${analysis.health_delta}
`;

  await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pr.number,
    body: commentBody,
  });
}

run();
