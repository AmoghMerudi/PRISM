from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import sqlite3

app = FastAPI()
db = sqlite3.connect("health.db", check_same_thread=False)

db.execute("""
CREATE TABLE IF NOT EXISTS repo_health (
  repo TEXT,
  timestamp TEXT,
  score INTEGER,
  reason TEXT
)
""")

class PRRequest(BaseModel):
    repo: str
    pr_number: int
    author: str
    additions: int
    deletions: int
    changed_files: int
    diff: str
    lint_passed: bool

@app.post("/analyze-pr")
def analyze_pr(pr: PRRequest):
    risks = []
    suggestions = []

    size = pr.additions + pr.deletions

    if size > 500:
        risks.append("Large PR size")
        suggestions.append("Consider splitting this PR into smaller chunks")

    if pr.changed_files > 10:
        risks.append("Touches many files")

    if not pr.lint_passed:
        risks.append("Lint checks failed")
        suggestions.append("Fix lint issues before merging")

    # --- Simple risk score ---
    risk_score = 0
    risk_score += min(size // 100, 5)
    risk_score += 2 if not pr.lint_passed else 0

    health_delta = -risk_score

    # Store repo health
    db.execute(
        "INSERT INTO repo_health VALUES (?, ?, ?, ?)",
        (pr.repo, datetime.utcnow().isoformat(), health_delta, ",".join(risks))
    )
    db.commit()

    # Gemini placeholder (replace later)
    summary = (
        f"This PR modifies {pr.changed_files} files with "
        f"{pr.additions} additions and {pr.deletions} deletions."
    )

    return {
        "summary": summary,
        "risks": risks,
        "suggestions": suggestions,
        "health_delta": health_delta
    }

@app.get("/health-history")
def health_history(repo: str):
    rows = db.execute(
        "SELECT timestamp, score FROM repo_health WHERE repo = ?",
        (repo,)
    ).fetchall()

    return [{"timestamp": r[0], "score": r[1]} for r in rows]
