import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./AnnotatedCode.css";

const severityIcons = {
  critical: "🔴",
  warning: "🟡",
  info: "🔵",
  suggestion: "🟢",
};

const AnnotatedCode = ({ code, language, annotations = [] }) => {
  const [filter, setFilter] = useState("all");
  const [hoveredLine, setHoveredLine] = useState(null);

  const lines = code?.split("\n") || [];

  const filtered =
    filter === "all"
      ? annotations
      : annotations.filter((a) => a.severity === filter);

  const annotationsByLine = {};
  filtered.forEach((a) => {
    if (!annotationsByLine[a.line]) {
      annotationsByLine[a.line] = [];
    }
    annotationsByLine[a.line].push(a);
  });

  const counts = {
    critical: annotations.filter((a) => a.severity === "critical").length,
    warning: annotations.filter((a) => a.severity === "warning").length,
    info: annotations.filter((a) => a.severity === "info").length,
    suggestion: annotations.filter((a) => a.severity === "suggestion").length,
  };

  return (
    <div className="annotated-code">
      <div className="annotation-toolbar">
        <div className="annotation-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({annotations.length})
          </button>

          {Object.entries(counts).map(
            ([severity, count]) =>
              count > 0 && (
                <button
                  key={severity}
                  className={`filter-btn severity-${severity} ${
                    filter === severity ? "active" : ""
                  }`}
                  onClick={() => setFilter(severity)}
                >
                  {severityIcons[severity]} {severity} ({count})
                </button>
              )
          )}
        </div>
      </div>

      <div className="code-with-annotations">
        {lines.map((line, index) => {
          const lineNum = index + 1;
          const lineAnnotations = annotationsByLine[lineNum];
          const hasAnnotation = !!lineAnnotations;

          return (
            <div key={lineNum}>
              <div
                className={`code-line ${
                  hasAnnotation ? "has-annotation" : ""
                } ${hoveredLine === lineNum ? "hovered" : ""}`}
                onMouseEnter={() => hasAnnotation && setHoveredLine(lineNum)}
                onMouseLeave={() => setHoveredLine(null)}
              >
                <span className="line-number">{lineNum}</span>

                <span className="line-marker">
                  {hasAnnotation && (
                    <span className="marker-dot">
                      {severityIcons[lineAnnotations[0].severity]}
                    </span>
                  )}
                </span>

                <pre className="line-content">
                  <code>{line || " "}</code>
                </pre>
              </div>

              {hasAnnotation &&
                lineAnnotations.map((annotation, aIdx) => (
                  <div
                    key={aIdx}
                    className={`annotation-inline severity-${annotation.severity}`}
                  >
                    <div className="annotation-header">
                      <span
                        className={`severity-badge severity-${annotation.severity}`}
                      >
                        {severityIcons[annotation.severity]}{" "}
                        {annotation.severity}
                      </span>

                      <span className="annotation-category">
                        {annotation.category}
                      </span>
                    </div>

                    <p className="annotation-message">{annotation.message}</p>

                    {annotation.suggestion && (
                      <p className="annotation-suggestion">
                        💡 {annotation.suggestion}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnotatedCode;
