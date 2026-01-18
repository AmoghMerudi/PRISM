import type { BackendAnalyzeResponse } from "../../src/adapters/prAdapter";
import { sampleAnalyzeResponse } from "../../src/mocks/sampleAnalyzeResponse";

type RepoHealth = {
  baseline_score: number;
  semantic_score: number | null;
  health_delta: number;
};

type RepoPR = {
  title: string;
  analysis: BackendAnalyzeResponse;
};

export type MockRepo = {
  name: string;
  reason: string;
  health: RepoHealth;
  health_history: number[];
  prs: RepoPR[];
};

const authRiskResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Token refresh logic updated to handle expired sessions.",
  risks: [
    "Authentication-related logic was modified, which is security-sensitive.",
  ],
  suggestions: ["Add tests for refresh-token expiry and retry flows."],
  health_delta: -3,
  baseline_score: 72,
  semantic_score: 84,
};

const billingResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Billing service refactored for clearer ownership boundaries.",
  risks: [],
  suggestions: ["Verify integration tests still pass in staging."],
  health_delta: 1,
  baseline_score: 78,
  semantic_score: 55,
};

const uiResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Dashboard layout spacing adjusted for readability.",
  risks: [],
  suggestions: ["Double-check responsive breakpoints on mobile."],
  health_delta: 2,
  baseline_score: 88,
  semantic_score: 42,
};

const infraRiskResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "CI pipeline configuration modified to add parallel jobs.",
  risks: [
    "Infrastructure-related configuration was modified, which may impact build stability.",
  ],
  suggestions: [
    "Validate pipeline changes against forked PRs and ensure secrets are not exposed.",
  ],
  health_delta: -5,
  baseline_score: 62,
  semantic_score: 78,
};

const docsResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Documentation updated to reflect new API usage patterns.",
  risks: [],
  suggestions: ["Consider adding a migration guide for existing users."],
  health_delta: 3,
  baseline_score: 92,
  semantic_score: 30,
};

export const mockRepos: MockRepo[] = [
  {
    name: "auth-service",
    reason: "Large PRs and missing tests",
    health: {
      baseline_score: 72,
      semantic_score: 84,
      health_delta: -3,
    },
    health_history: [76, 74, 73, 75, 72, 70, 71, 69, 72, 71],
    prs: [
      {
        title: "Fix auth token refresh",
        analysis: authRiskResponse,
      },
      {
        title: "Refactor billing service",
        analysis: billingResponse,
      },
    ],
  },
  {
    name: "frontend-app",
    reason: "Consistent PR sizes and good test coverage",
    health: {
      baseline_score: 88,
      semantic_score: 42,
      health_delta: 2,
    },
    health_history: [82, 84, 83, 85, 87, 86, 88, 89, 87, 88],
    prs: [
      {
        title: "Improve dashboard layout",
        analysis: uiResponse,
      },
    ],
  },
  {
    name: "infra-pipelines",
    reason: "Recent CI changes increased operational risk",
    health: {
      baseline_score: 62,
      semantic_score: 78,
      health_delta: -5,
    },
    health_history: [70, 68, 66, 65, 64, 62, 60, 61, 59, 62],
    prs: [
      {
        title: "Parallelize CI jobs",
        analysis: infraRiskResponse,
      },
    ],
  },
  {
    name: "docs-site",
    reason: "Low-risk changes with clear intent",
    health: {
      baseline_score: 92,
      semantic_score: 30,
      health_delta: 3,
    },
    health_history: [88, 89, 90, 91, 92, 93, 91, 92, 94, 93],
    prs: [
      {
        title: "Update API documentation",
        analysis: docsResponse,
      },
    ],
  },
];