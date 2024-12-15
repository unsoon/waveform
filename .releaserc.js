const commitGroupsOrder = [
  "features",
  "performance",
  "bugfixes",
  "tests",
  "refactoring",
  "ci",
  "chore",
  "documentation",
  "styles",
  "dependencies",
];

module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "chore", scope: "deps", section: "Dependencies" },
            { type: "fix", scope: "deps", section: "Dependencies" },
            { type: "feat", section: "Features" },
            { type: "fix", section: "Bug Fixes" },
            { type: "chore", section: "Chore" },
            { type: "test", section: "Tests" },
            { type: "ci", section: "CI" },
            { type: "docs", section: "Documentation" },
            { type: "style", section: "Styles" },
            { type: "refactor", section: "Refactoring" },
            { type: "perf", section: "Performance" },
          ],
        },
        writerOpts: {
          groupBy: "type",
          commitGroupsSort: (commitGroupA, commitGroupB) => {
            const commitGroupATitle = commitGroupA.title.replace(/[^a-zA-Z]/gu, "").toLowerCase();
            const commitGroupBTitle = commitGroupB.title.replace(/[^a-zA-Z]/gu, "").toLowerCase();

            const commitGroupAIndex = commitGroupsOrder.indexOf(commitGroupATitle);
            const commitGroupBIndex = commitGroupsOrder.indexOf(commitGroupBTitle);

            return commitGroupAIndex - commitGroupBIndex;
          },
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/github",
      {
        failComment: false,
        successComment: false,
        releasedLabels: ["published"],
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "pnpm-lock.json", "CHANGELOG.md"],
        message: "chore(release): ${nextRelease.version}\n\n${nextRelease.notes}",
      },
    ],
  ],
};
