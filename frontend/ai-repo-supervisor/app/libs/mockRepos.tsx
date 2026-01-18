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

const uxResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Navigation flow refined to reduce clicks for key actions.",
  risks: [],
  suggestions: ["Validate accessibility contrast ratios after changes."],
  health_delta: 1,
  baseline_score: 86,
  semantic_score: 47,
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

const infraResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Caching layer added to speed up artifact downloads.",
  risks: [],
  suggestions: ["Monitor cache hit rate for the next few builds."],
  health_delta: 2,
  baseline_score: 66,
  semantic_score: 72,
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

const docsCleanupResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Docs navigation cleaned up and broken links removed.",
  risks: [],
  suggestions: ["Add link checks to the CI docs pipeline."],
  health_delta: 1,
  baseline_score: 90,
  semantic_score: 34,
};

const paymentsRiskResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Ledger rounding logic updated to handle edge-case refunds.",
  risks: ["Financial calculations changed; verify totals across invoices."],
  suggestions: ["Add regression tests for rounding across currencies."],
  health_delta: -6,
  baseline_score: 58,
  semantic_score: 81,
};

const paymentsSafeguardResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Reconciliation checks added for daily settlement batches.",
  risks: [],
  suggestions: ["Monitor batch timings during peak hours."],
  health_delta: 2,
  baseline_score: 61,
  semantic_score: 70,
};

const mobileCacheResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Offline cache strategy tuned to reduce cold-start latency.",
  risks: [],
  suggestions: ["Confirm cache eviction on low-storage devices."],
  health_delta: 2,
  baseline_score: 85,
  semantic_score: 49,
};

const mobileOnboardingResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Onboarding screens refreshed with clearer copy and steps.",
  risks: [],
  suggestions: ["Review localization layout before release."],
  health_delta: 1,
  baseline_score: 87,
  semantic_score: 45,
};

const pipelineBackfillResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Historical event backfill scheduled for analytics consistency.",
  risks: ["Large backfill could impact warehouse performance."],
  suggestions: ["Throttle backfill jobs during peak query windows."],
  health_delta: -3,
  baseline_score: 68,
  semantic_score: 66,
};

const pipelineSchemaResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Metrics schema migration staged with dual-write support.",
  risks: [],
  suggestions: ["Keep dual-write until downstream consumers are updated."],
  health_delta: 1,
  baseline_score: 70,
  semantic_score: 62,
};

const identityRiskResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Role mapping updated to support new enterprise groups.",
  risks: ["Authorization paths changed; validate role fallback behavior."],
  suggestions: ["Add integration tests for role sync edge cases."],
  health_delta: -4,
  baseline_score: 64,
  semantic_score: 79,
};

const identityAuditResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Audit log enrichment added for admin actions.",
  risks: [],
  suggestions: ["Verify log retention policies cover new fields."],
  health_delta: 2,
  baseline_score: 67,
  semantic_score: 71,
};

const notificationsBatchResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Digest batching introduced to reduce notification volume.",
  risks: [],
  suggestions: ["Monitor unsubscribe rates after rollout."],
  health_delta: 2,
  baseline_score: 83,
  semantic_score: 44,
};

const notificationsDeliverabilityResponse: BackendAnalyzeResponse = {
  ...sampleAnalyzeResponse,
  summary: "Sender reputation monitoring wired into alerting.",
  risks: [],
  suggestions: ["Set thresholds for bounced email spikes."],
  health_delta: 1,
  baseline_score: 84,
  semantic_score: 46,
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
      {
        title: "Refine navigation flow",
        analysis: uxResponse,
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
      {
        title: "Add build cache layer",
        analysis: infraResponse,
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
      {
        title: "Clean up docs navigation",
        analysis: docsCleanupResponse,
      },
    ],
  },
  {
    name: "payments-core",
    reason: "Financial logic changes need extra validation",
    health: {
      baseline_score: 58,
      semantic_score: 81,
      health_delta: -6,
    },
    health_history: [64, 63, 61, 60, 59, 58, 57, 58, 56, 58],
    prs: [
      {
        title: "Adjust ledger rounding",
        analysis: paymentsRiskResponse,
      },
      {
        title: "Add reconciliation safeguards",
        analysis: paymentsSafeguardResponse,
      },
    ],
  },
  {
    name: "mobile-client",
    reason: "Stable releases with small UX improvements",
    health: {
      baseline_score: 85,
      semantic_score: 49,
      health_delta: 2,
    },
    health_history: [80, 81, 83, 82, 84, 85, 86, 85, 84, 85],
    prs: [
      {
        title: "Tune offline cache",
        analysis: mobileCacheResponse,
      },
      {
        title: "Refresh onboarding screens",
        analysis: mobileOnboardingResponse,
      },
    ],
  },
  {
    name: "data-pipeline",
    reason: "Backfills and schema changes pending",
    health: {
      baseline_score: 68,
      semantic_score: 66,
      health_delta: -3,
    },
    health_history: [72, 71, 70, 69, 68, 67, 68, 66, 67, 68],
    prs: [
      {
        title: "Backfill events table",
        analysis: pipelineBackfillResponse,
      },
      {
        title: "Migrate metrics schema",
        analysis: pipelineSchemaResponse,
      },
    ],
  },
  {
    name: "identity-platform",
    reason: "Access-control updates need careful review",
    health: {
      baseline_score: 64,
      semantic_score: 79,
      health_delta: -4,
    },
    health_history: [70, 69, 68, 66, 65, 64, 63, 64, 62, 64],
    prs: [
      {
        title: "Update role mappings",
        analysis: identityRiskResponse,
      },
      {
        title: "Enrich audit logging",
        analysis: identityAuditResponse,
      },
    ],
  },
  {
    name: "notifications-hub",
    reason: "High volume but stable delivery metrics",
    health: {
      baseline_score: 83,
      semantic_score: 44,
      health_delta: 2,
    },
    health_history: [78, 79, 80, 81, 82, 83, 84, 83, 82, 83],
    prs: [
      {
        title: "Introduce digest batching",
        analysis: notificationsBatchResponse,
      },
      {
        title: "Monitor sender reputation",
        analysis: notificationsDeliverabilityResponse,
      },
    ],
  },
];