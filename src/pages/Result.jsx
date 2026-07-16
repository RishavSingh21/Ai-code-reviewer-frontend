import { useState } from "react";
import Layout from "../components/Layout/Layout";
import ReviewRadar from "../components/ReviewRadar/ReviewRadar";
import AnnotatedCode from "../components/AnnotatedCode/AnnotatedCode";
import DiffView from "../components/DiffView/DiffView";
import ExportMenu from "../components/ExportMenu/ExportMenu";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import "./Result.css";

const Result = () => {
  const [activeTab, setActiveTab] = useState("summary");

  let review = null;
  try {
    review = JSON.parse(sessionStorage.getItem("review"));
  } catch {
    review = null;
  }

  if (!review) {
    return (
      <Layout>
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>No Review Found</h2>
          <p>Submit code for review to see results here.</p>
        </div>
      </Layout>
    );
  }

  const feedback = review.aiFeedback || {};
  const annotations = feedback.annotations || [];
  const score = feedback.score ?? 0;

  const scoreColor =
    score >= 80
      ? "var(--accent-green)"
      : score >= 60
      ? "var(--accent-yellow)"
      : "var(--accent-red)";

  const copyCode = () => {
    navigator.clipboard.writeText(feedback.improvedCode || "");
    toast.success("Copied to clipboard");
  };

  const tabs = [
    { id: "summary", label: "Summary", icon: "📊" },
    { id: "annotations", label: `Annotations (${annotations.length})`, icon: "🔍" },
    { id: "diff", label: "Diff View", icon: "🔄" },
    { id: "code", label: "Improved Code", icon: "✨" },
  ];

  return (
    <Layout>
      <div className="result-header">
        <div>
          <h1 className="page-title">AI Review Report</h1>
          <p className="page-subtitle">
            {review.language} • {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
        <ExportMenu review={review} />
      </div>

      {/* Score Banner */}
      <div className="score-banner glass-card">
        <div className="score-ring" style={{ "--score-color": scoreColor }}>
          <svg viewBox="0 0 100 100">
            <circle className="score-track" cx="50" cy="50" r="42" />
            <circle
              className="score-fill"
              cx="50"
              cy="50"
              r="42"
              style={{
                strokeDasharray: `${score * 2.64} 264`,
                stroke: scoreColor,
              }}
            />
          </svg>
          <span className="score-value">{score}</span>
        </div>

        <div className="score-details">
          <h2>Overall Quality Score</h2>
          <p>{feedback.summary || "No summary available."}</p>

          <div className="score-meta">
            {feedback.complexity && (
              <>
                <span className="meta-chip">⏱ Time: {feedback.complexity.time || "N/A"}</span>
                <span className="meta-chip">💾 Space: {feedback.complexity.space || "N/A"}</span>
              </>
            )}
            <span className="meta-chip">
              🐛 {annotations.filter((a) => a.severity === "critical").length} Critical
            </span>
            <span className="meta-chip">
              ⚠️ {annotations.filter((a) => a.severity === "warning").length} Warnings
            </span>
          </div>
        </div>

        {feedback.subScores && (
          <div className="score-radar-inline">
            <ReviewRadar subScores={feedback.subScores} />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content fade-in" key={activeTab}>
        {activeTab === "summary" && (
          <div className="summary-grid">
            {feedback.bugs?.length > 0 && (
              <div className="summary-section glass-card">
                <h3>🐛 Bugs Found</h3>
                <ul>
                  {feedback.bugs.map((bug, i) => (
                    <li key={i}>{bug}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.suggestions?.length > 0 && (
              <div className="summary-section glass-card">
                <h3>💡 Suggestions</h3>
                <ul>
                  {feedback.suggestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.bestPractices?.length > 0 && (
              <div className="summary-section glass-card">
                <h3>✅ Best Practices</h3>
                <ul>
                  {feedback.bestPractices.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.security?.length > 0 && (
              <div className="summary-section glass-card">
                <h3>🔒 Security</h3>
                <ul>
                  {feedback.security.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {feedback.readability?.length > 0 && (
              <div className="summary-section glass-card">
                <h3>📖 Readability</h3>
                <ul>
                  {feedback.readability.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "annotations" && (
          <AnnotatedCode
            code={review.sourceCode}
            language={review.language}
            annotations={annotations}
          />
        )}

        {activeTab === "diff" && (
          <DiffView
            originalCode={review.sourceCode}
            improvedCode={feedback.improvedCode}
          />
        )}

        {activeTab === "code" && feedback.improvedCode && (
          <div className="improved-code-section">
            <div className="code-header">
              <h3>Improved Code</h3>
              <button className="copy-btn" onClick={copyCode}>
                📋 Copy Code
              </button>
            </div>
            <SyntaxHighlighter
              language={review.language}
              style={oneDark}
              customStyle={{
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "13px",
              }}
            >
              {feedback.improvedCode}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Result;