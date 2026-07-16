import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import api from "../services/api";
import "./BatchReview.css";

const BatchReview = () => {
  const navigate = useNavigate();
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const languageMap = {
    js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript",
    py: "python", java: "java", c: "c", cpp: "cpp", cs: "csharp",
    go: "go", rs: "rust", php: "php", html: "html", css: "css",
    json: "json", sql: "sql", rb: "ruby", swift: "swift", kt: "kotlin",
  };

  const detectLanguage = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    return languageMap[ext] || "plaintext";
  };

  const handleFiles = async (fileList) => {
    const newFiles = [];

    for (const file of fileList) {
      if (file.size > 100000) {
        toast.error(`${file.name} is too large (max 100KB)`);
        continue;
      }

      const text = await file.text();
      newFiles.push({
        filename: file.name,
        language: detectLanguage(file.name),
        code: text,
      });
    }

    setFiles((prev) => [...prev, ...newFiles].slice(0, 10));
    if (newFiles.length > 0) toast.success(`${newFiles.length} file(s) added`);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBatchReview = async () => {
    if (files.length === 0) {
      toast.error("Add at least one file");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/review/batch", { files });
      setResults(res.data.data);
      toast.success("Batch review completed!");
    } catch (error) {
      console.error(error);
      toast.error("Batch review failed");
    } finally {
      setLoading(false);
    }
  };

  const viewFileResult = (fileResult) => {
    if (fileResult.status !== "success") return;
    const reviewData = {
      language: fileResult.language,
      sourceCode: files.find((f) => f.filename === fileResult.filename)?.code || "",
      aiFeedback: fileResult.feedback,
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem("review", JSON.stringify(reviewData));
    navigate("/result");
  };

  return (
    <Layout>
      <h1 className="page-title">Batch Review</h1>
      <p className="page-subtitle">
        Review multiple files at once — drag and drop up to 10 files
      </p>

      {!results ? (
        <>
          <div
            ref={dropRef}
            className={`drop-zone glass-card ${dragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="drop-icon">📂</div>
            <h3>Drop files here or click to browse</h3>
            <p>Supports .js, .py, .java, .ts, .cpp, .go and more • Max 10 files</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />

          {files.length > 0 && (
            <div className="file-list">
              <div className="file-list-header">
                <h3>Files ({files.length}/10)</h3>
                <button className="clear-btn" onClick={() => setFiles([])}>
                  Clear All
                </button>
              </div>

              {files.map((file, index) => (
                <div key={index} className="file-item glass-card">
                  <div className="file-info">
                    <span className="file-icon">📄</span>
                    <div>
                      <strong>{file.filename}</strong>
                      <span className="file-meta">
                        {file.language} • {file.code.split("\n").length} lines
                      </span>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                className="batch-submit-btn"
                onClick={handleBatchReview}
                disabled={loading}
              >
                {loading ? "Reviewing..." : `🤖 Review ${files.length} File(s)`}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="batch-results">
          <div className="batch-summary glass-card">
            <div className="batch-stat">
              <span className="batch-stat-value">{results.aggregateScore}%</span>
              <span className="batch-stat-label">Avg Score</span>
            </div>
            <div className="batch-stat">
              <span className="batch-stat-value">{results.totalFiles}</span>
              <span className="batch-stat-label">Total Files</span>
            </div>
            <div className="batch-stat">
              <span className="batch-stat-value success">{results.successCount}</span>
              <span className="batch-stat-label">Passed</span>
            </div>
            <div className="batch-stat">
              <span className="batch-stat-value error">{results.errorCount}</span>
              <span className="batch-stat-label">Failed</span>
            </div>
          </div>

          <div className="batch-file-results">
            {results.files.map((file, index) => (
              <div
                key={index}
                className={`batch-file-card glass-card ${file.status}`}
                onClick={() => viewFileResult(file)}
                style={{ cursor: file.status === "success" ? "pointer" : "default" }}
              >
                <div className="batch-file-info">
                  <span className="batch-file-status">
                    {file.status === "success" ? "✅" : "❌"}
                  </span>
                  <div>
                    <strong>{file.filename}</strong>
                    <span className="file-meta">{file.language}</span>
                  </div>
                </div>

                {file.status === "success" && (
                  <div className="batch-file-score">
                    <span
                      style={{
                        color:
                          file.feedback?.score >= 80
                            ? "var(--accent-green)"
                            : file.feedback?.score >= 60
                            ? "var(--accent-yellow)"
                            : "var(--accent-red)",
                      }}
                    >
                      {file.feedback?.score}%
                    </span>
                    <span className="annotation-count">
                      {file.feedback?.annotations?.length || 0} issues
                    </span>
                  </div>
                )}

                {file.status === "error" && (
                  <span className="batch-error-msg">{file.error}</span>
                )}
              </div>
            ))}
          </div>

          <button
            className="batch-submit-btn"
            onClick={() => { setResults(null); setFiles([]); }}
          >
            🔄 New Batch Review
          </button>
        </div>
      )}
    </Layout>
  );
};

export default BatchReview;
