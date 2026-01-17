export const mockRepos = [
    {
      name: "auth-service",
      healthScore: 72,
      status: "At Risk",
      reason: "Large PRs and missing tests",
      prs: [
        {
          title: "Fix auth token refresh",
          summary: "Large diff · No new tests · Risk increased",
        },
        {
          title: "Refactor billing service",
          summary: "Medium diff · Tests added · Health improved",
        },
      ],
    },
    {
      name: "frontend-app",
      healthScore: 88,
      status: "Healthy",
      reason: "Consistent PR sizes and good test coverage",
      prs: [
        {
          title: "Improve dashboard layout",
          summary: "Small diff · UI only · Low risk",
        },
      ],
    },
  ];