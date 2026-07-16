import { useState } from "react";
import "./DiffView.css";

const DiffView = ({ originalCode, improvedCode }) => {
  const [mode, setMode] = useState("split");

  if (!originalCode || !improvedCode) {
    return (
      <div className="diff-empty glass-card">
        <p>No code comparison available.</p>
      </div>
    );
  }

  const originalLines = originalCode.split("\n");
  const improvedLines = improvedCode.split("\n");
  const maxLines = Math.max(originalLines.length, improvedLines.length);

  // Simple line-by-line diff
  const diffLines = [];
  for (let i = 0; i < maxLines; i++) {
    const orig = originalLines[i] ?? "";
    const improved = improvedLines[i] ?? "";
    diffLines.push({
      lineNum: i + 1,
      original: orig,
      improved: improved,
      status:
        orig === improved
          ? "unchanged"
          : !orig && improved
          ? "added"
          : orig && !improved
          ? "removed"
          : "modified",
    });
  }

  const stats = {
    added: diffLines.filter((l) => l.status === "added").length,
    removed: diffLines.filter((l) => l.status === "removed").length,
    modified: diffLines.filter((l) => l.status === "modified").length,
  };

  return (
    <div className="diff-view">
      <div className="diff-header">
        <div className="diff-stats">
          <span className="diff-stat added">+{stats.added} added</span>
          <span className="diff-stat removed">-{stats.removed} removed</span>
          <span className="diff-stat modified">~{stats.modified} modified</span>
        </div>

        <div className="diff-mode-toggle">
          <button
            className={mode === "split" ? "active" : ""}
            onClick={() => setMode("split")}
          >
            Split
          </button>
          <button
            className={mode === "unified" ? "active" : ""}
            onClick={() => setMode("unified")}
          >
            Unified
          </button>
        </div>
      </div>

      {mode === "split" ? (
        <div className="diff-split">
          <div className="diff-pane">
            <div className="diff-pane-header">Original Code</div>
            <div className="diff-lines">
              {diffLines.map((line) => (
                <div
                  key={`orig-${line.lineNum}`}
                  className={`diff-line ${
                    line.status === "removed" || line.status === "modified"
                      ? "removed"
                      : ""
                  }`}
                >
                  <span className="diff-line-num">{line.lineNum}</span>
                  <pre className="diff-line-code">{line.original || " "}</pre>
                </div>
              ))}
            </div>
          </div>

          <div className="diff-pane">
            <div className="diff-pane-header">Improved Code</div>
            <div className="diff-lines">
              {diffLines.map((line) => (
                <div
                  key={`imp-${line.lineNum}`}
                  className={`diff-line ${
                    line.status === "added" || line.status === "modified"
                      ? "added"
                      : ""
                  }`}
                >
                  <span className="diff-line-num">{line.lineNum}</span>
                  <pre className="diff-line-code">{line.improved || " "}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="diff-unified">
          <div className="diff-lines">
            {diffLines.map((line) => {
              if (line.status === "unchanged") {
                return (
                  <div key={line.lineNum} className="diff-line">
                    <span className="diff-line-num">{line.lineNum}</span>
                    <span className="diff-sign"> </span>
                    <pre className="diff-line-code">{line.original}</pre>
                  </div>
                );
              }

              return (
                <div key={line.lineNum}>
                  {line.original && (
                    <div className="diff-line removed">
                      <span className="diff-line-num">{line.lineNum}</span>
                      <span className="diff-sign">-</span>
                      <pre className="diff-line-code">{line.original}</pre>
                    </div>
                  )}
                  {line.improved && (
                    <div className="diff-line added">
                      <span className="diff-line-num">{line.lineNum}</span>
                      <span className="diff-sign">+</span>
                      <pre className="diff-line-code">{line.improved}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffView;
