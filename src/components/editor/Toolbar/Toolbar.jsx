import "./Toolbar.css";

const Toolbar = ({
  languageSelector,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  onUpload,
  onDownload,
  onCopy,
  onClear,
  onReview,
  loading,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        {languageSelector}

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
        </select>

        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        >
          <option value={12}>12px</option>
          <option value={14}>14px</option>
          <option value={16}>16px</option>
          <option value={18}>18px</option>
        </select>
      </div>

      <div className="toolbar-right">
        <button onClick={onUpload}>📂 Upload</button>

        <button onClick={onDownload}>📥 Download</button>

        <button onClick={onCopy}>📋 Copy</button>

        <button onClick={onClear}>🗑 Clear</button>

        <button
          className="review-btn"
          onClick={onReview}
          disabled={loading}
        >
          {loading ? "Reviewing..." : "🤖 Review"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;