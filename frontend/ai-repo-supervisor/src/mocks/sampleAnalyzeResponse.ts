// frontend/ai-repo-supervisor/src/mocks/sampleAnalyzeResponse.ts

import type { BackendAnalyzeResponse } from "../adapters/prAdapter";

export const sampleAnalyzeResponse: BackendAnalyzeResponse = {
  summary: "This pull request makes small, focused changes.",
  risks: [],
  suggestions: [],
  health_delta: 0,
  baseline_score: 80,
  semantic_score: 60,
};